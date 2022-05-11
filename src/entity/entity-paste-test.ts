import { mutableShallowCopy, shallowCopy } from "../lib/util"
import { Mutable } from "../lib/util-types"
import { EntitySampleName, getEntitySample } from "../test/entity-sample"
import { EntityNumber, ReferenceEntity } from "./entity"
import {
  computeEntityDiff,
  createReferenceOnlyEntity,
  findEntityPasteConflict,
  findEntityPasteConflictAndUpdate,
  isCompatibleEntity,
} from "./entity-paste"

describe("isCompatibleEntity", () => {
  test("identical entities are compatible", () => {
    const entity = getEntitySample("chest")
    const entity2 = { ...entity }
    assert.is_true(isCompatibleEntity(entity, entity2))
  })

  test("entities of different types are incompatible", () => {
    const entity = getEntitySample("chest")
    const entity2 = getEntitySample("furnace")
    assert.is_false(isCompatibleEntity(entity, entity2))
  })

  test("entities in different positions are incompatible", () => {
    const entity = getEntitySample("chest")
    const entity2 = {
      ...entity,
      position: { x: 100.5, y: 100.5 },
    }
    assert.is_false(isCompatibleEntity(entity, entity2))
  })

  test("manual override position", () => {
    const entity = getEntitySample("chest")
    const entity2 = {
      ...entity,
      position: { x: 100.5, y: 100.5 },
    }
    assert.is_true(isCompatibleEntity(entity, entity2, entity.position))
  })

  test("entities in same fast replace group is compatible", () => {
    const entity = getEntitySample("assembling-machine-1")
    const entity2 = {
      ...getEntitySample("assembling-machine-2"),
      position: entity.position,
    }
    assert.is_true(isCompatibleEntity(entity, entity2))
  })

  test("rotated normal entities are not compatible", () => {
    const entity1 = getEntitySample("inserter")
    const entity2 = {
      ...getEntitySample("rotated-inserter"),
      position: entity1.position,
    }
    assert.is_false(isCompatibleEntity(entity1, entity2))
  })

  test("rotated square assembling machines are compatible", () => {
    const entity1 = getEntitySample("fluid-assembling-machine")
    const entity2 = {
      ...getEntitySample("rotated-fluid-assembling-machine"),
      position: entity1.position,
    }
    assert.is_true(isCompatibleEntity(entity1, entity2))
  })
})

describe("findEntityPasteConflict", () => {
  test("pasting an entity on itself is successful", () => {
    const entity = getEntitySample("chest")
    assert.is_nil(findEntityPasteConflict(entity, entity))
  })

  test("pasting a pasteable prop is successful", () => {
    const entity = getEntitySample("assembling-machine-1")
    const entity2 = { ...entity, recipe: "iron-gear-wheel" }
    assert.is_nil(findEntityPasteConflict(entity, entity2))
  })

  test("pasting recipe from none successful", () => {
    const entity = getEntitySample("assembling-machine-1")
    const entity2 = mutableShallowCopy(entity)
    entity2.recipe = undefined
    assert.is_nil(findEntityPasteConflict(entity, entity2))
  })

  test("pasting to remove recipe is successful", () => {
    const entity = getEntitySample("assembling-machine-1")
    const entity2 = mutableShallowCopy(entity)
    entity2.recipe = undefined
    assert.is_nil(findEntityPasteConflict(entity, entity2))
  })

  test("pasting an entity in the same fast replace group is unsuccessful", () => {
    const entity1 = getEntitySample("assembling-machine-1")
    const entity2 = { ...getEntitySample("assembling-machine-2"), position: entity1.position }
    assert.equal("name", findEntityPasteConflict(entity1, entity2))
  })

  test.each<[EntitySampleName, EntitySampleName]>(
    [
      ["assembling-machine-2", "assembling-machine-with-modules-1"],
      ["assembling-machine-with-modules-1", "assembling-machine-2"],
      ["assembling-machine-with-modules-1", "assembling-machine-with-modules-2"],
    ],
    "pasting %s to %s",

    (belowName, aboveName) => {
      const entity1 = getEntitySample(belowName)
      const entity2 = {
        ...getEntitySample(aboveName),
        position: entity1.position,
        entity_number: entity1.entity_number,
      }
      assert.equal("items", findEntityPasteConflict(entity1, entity2))
    },
  )

  it("reports unhandled props", () => {
    const entity = getEntitySample("assembling-machine-1")
    const entity2 = mutableShallowCopy(entity) as any
    entity2.foo = "bar"
    assert.equal("foo", findEntityPasteConflict(entity, entity2))
    assert.equal("foo", findEntityPasteConflict(entity2, entity))
  })

  it("does not report unhandled props if identical", () => {
    const entity = getEntitySample("assembling-machine-1")
    const entity2 = mutableShallowCopy(entity) as any
    entity2.foo = "bar"
    assert.equal(undefined, findEntityPasteConflict(entity2, entity2))
  })

  it("does not report conflict for empty reference entities", () => {
    const entity1 = getEntitySample("assembling-machine-1")
    const entity2 = { ...getEntitySample("assembling-machine-2"), position: entity1.position }
    const emptyReferenceEntity = createReferenceOnlyEntity(entity2)
    assert.is_nil(findEntityPasteConflict(entity1, emptyReferenceEntity))
  })

  it("only cares about entities in changedProps", () => {
    const entity1 = getEntitySample("assembling-machine-1")
    const entity2: BlueprintEntityRead = {
      ...getEntitySample("assembling-machine-2"),
      position: entity1.position,
      items: { "productivity-module": 1 },
    }
    const diffEntity = shallowCopy(entity2) as Mutable<ReferenceEntity>
    diffEntity.changedProps = new LuaSet("items") // ignore "name"
    assert.same("items", findEntityPasteConflict(entity1, diffEntity))
  })
})

describe("findEntityPasteConflictsAndUpdate", () => {
  test("does not give conflict for compatible changedProps and updates other props", () => {
    const assemblingMachine = getEntitySample("assembling-machine-1")
    const updatedAssemblingMachine: ReferenceEntity = {
      ...assemblingMachine,
      name: "assembling-machine-2",
      recipe: "furnace",
      changedProps: new LuaSet("recipe"), // name not considered
    }
    const prop = findEntityPasteConflictAndUpdate(assemblingMachine, updatedAssemblingMachine)
    assert.is_nil(prop)

    assert.same(
      {
        ...assemblingMachine,
        // name: "assembling-machine-2",
        recipe: "furnace",
        changedProps: new LuaSet("recipe"),
      },
      updatedAssemblingMachine,
    )
  })
  test("returns conflict if is in changedProps", () => {
    const assemblingMachine = getEntitySample("assembling-machine-1")
    const updatedAssemblingMachine: ReferenceEntity = {
      ...assemblingMachine,
      name: "assembling-machine-2",
      changedProps: new LuaSet("name"),
    }
    const prop = findEntityPasteConflictAndUpdate(assemblingMachine, updatedAssemblingMachine)
    assert.equal("name", prop)

    const updatedAssemblingMachine2: ReferenceEntity = {
      ...assemblingMachine,
      items: { "productivity-module": 1 },
      changedProps: new LuaSet("items"),
    }
    const prop2 = findEntityPasteConflictAndUpdate(assemblingMachine, updatedAssemblingMachine2)
    assert.equal("items", prop2)
  })

  test("updates other props even if there is conflict", () => {
    const assemblingMachine = getEntitySample("assembling-machine-1")
    const updatedAssemblingMachine: ReferenceEntity = {
      ...assemblingMachine,
      name: "assembling-machine-2",
      recipe: "furnace",
      changedProps: new LuaSet("name"), // name not considered
    }
    const prop = findEntityPasteConflictAndUpdate(assemblingMachine, updatedAssemblingMachine)
    assert.equal("name", prop)

    assert.same(
      {
        ...assemblingMachine,
        name: "assembling-machine-2",
        changedProps: new LuaSet("name"),
      },
      updatedAssemblingMachine,
    )
  })
})

describe("computeEntityDiff", () => {
  test("returns undefined for identical entities", () => {
    const entity = getEntitySample("assembling-machine-1")
    assert.is_nil(computeEntityDiff(entity, entity, {}))
  })

  test.each(["iron-gear-wheel", false as any], "returns appropriate diff for different entities: %s", (value) => {
    const entity1 = getEntitySample("assembling-machine-1")
    const entity2 = mutableShallowCopy(entity1)
    entity2.recipe = value || undefined
    const diff = computeEntityDiff(entity1, entity2, {})
    assert.not_nil(diff)
    assert.same(new LuaSet("recipe"), diff!.changedProps)
  })

  test("adopts entity number of after", () => {
    const entity1 = getEntitySample("assembling-machine-1")
    const entity2 = mutableShallowCopy(entity1)
    entity2.entity_number++
    entity2.recipe = "iron-gear-wheel"
    const diff = computeEntityDiff(entity1, entity2, {})
    assert.equal(entity2.entity_number, diff!.entity_number)
  })

  describe("connections", () => {
    function testConnections(
      old: BlueprintCircuitConnection | undefined,
      cur: BlueprintCircuitConnection | undefined,
      expected: BlueprintCircuitConnection | undefined,
      entityNumberMap: Record<EntityNumber, EntityNumber> = { 1: 1 },
    ) {
      const base = getEntitySample("assembling-machine-1")
      const entity1 = { ...base, connections: old }
      const entity2 = { ...base, connections: cur }
      const diff = computeEntityDiff(entity1, entity2, entityNumberMap)
      if (expected === undefined) {
        assert.is_nil(diff)
      } else {
        assert.same(new LuaSet("connections"), diff!.changedProps)
        assert.same(expected, diff!.connections)
      }
    }

    test("identical", () => {
      const connection = { "1": { red: [{ entity_id: 1 }] } }
      testConnections(connection, connection, undefined)
    })

    test("single add", () => {
      const connection = { "1": { red: [{ entity_id: 1 }] } }
      testConnections(undefined, connection, connection)
    })

    test("different entity id", () => {
      const connection1 = { "1": { red: [{ entity_id: 1 }] } }
      const connection2 = { "1": { red: [{ entity_id: 1 }, { entity_id: 2 }] } }
      const expected = { "1": { red: [{ entity_id: 2 }] } }
      testConnections(connection1, connection2, expected)
    })

    test("different color", () => {
      const connection1 = { "1": { red: [{ entity_id: 1 }] } }
      const connection2 = { "1": { red: [{ entity_id: 1 }], green: [{ entity_id: 1 }] } }
      const expected = { "1": { green: [{ entity_id: 1 }] } }
      testConnections(connection1, connection2, expected)
    })

    test("different point", () => {
      const connection1 = { "1": { red: [{ entity_id: 1 }] } }
      const connection2 = { "1": { red: [{ entity_id: 1 }] }, "2": { red: [{ entity_id: 1 }] } }
      const expected = { "2": { red: [{ entity_id: 1 }] } }
      testConnections(connection1, connection2, expected)
    })
  })
})
