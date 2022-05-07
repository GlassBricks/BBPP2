import { bbox } from "../../lib/geometry/bounding-box"
import { Mutable } from "../../lib/util-types"
import { AreaIdentification } from "../AreaIdentification"
import scaleAroundCenter = bbox.scaleAroundCenter
import center = bbox.center

export interface DiagnosticCategory<Id extends string> {
  readonly id: Id
  readonly shortDescription: LocalisedString // title
  readonly longDescription?: LocalisedString // tooltip
  readonly highlightType?: CursorBoxRenderType
}

export type Diagnostic = {
  readonly id: string
  readonly message?: LocalisedString
  readonly location?: AreaIdentification
  readonly altLocation?: AreaIdentification
}

export type DiagnosticCollection<Id extends string = string> = {
  [K in Id]?: Diagnostic[]
}

const categories = new Map<string, DiagnosticCategory<string>>()

export function DiagnosticCategory<Id extends string, A extends any[]>(
  category: DiagnosticCategory<Id>,
  factory: (this: void, ...args: A) => Omit<Diagnostic, "id">,
): DiagnosticCategory<Id> & { create: (this: void, ...args: A) => Diagnostic } {
  const id = category.id
  if (categories.has(id)) {
    error("Duplicate diagnostic category: " + id)
  }

  const result = {
    ...category,
    create(this: void, ...args: A) {
      const diagnostic = factory(...args) as Mutable<Diagnostic>
      diagnostic.id = id
      return diagnostic
    },
  }
  categories.set(id, category)
  return result
}

export function getDiagnosticCategory<Id extends string>(id: Id): DiagnosticCategory<Id> | undefined {
  return categories.get(id) as DiagnosticCategory<Id> | undefined
}

export function addDiagnostic<Id extends string, A extends any[]>(
  map: DiagnosticCollection<Id>,
  category: DiagnosticCategory<Id> & { create: (this: void, ...args: A) => Diagnostic },
  ...args: A
): Diagnostic {
  const diagnostic = category.create(...args)
  const id = category.id
  // noinspection JSMismatchedCollectionQueryUpdate
  const arr: Diagnostic[] = map[id] || (map[id] = [])
  arr.push(diagnostic)
  return diagnostic
}

const defaultType: CursorBoxRenderType = "entity"
export function createDiagnosticHighlight(
  diagnostic: Diagnostic,
  additionalParams: Partial<HighlightBoxSurfaceCreateEntity> = {},
  scale: number = 1,
): HighlightBoxEntity | undefined {
  const { id, location } = diagnostic
  if (!location) return
  const box = location.area
  const highlightType = categories.get(id)!.highlightType ?? defaultType
  return location.surface.create_entity({
    name: "highlight-box",
    position: center(box),
    bounding_box: scaleAroundCenter(box, scale),
    box_type: highlightType,
    ...additionalParams,
  })
}
