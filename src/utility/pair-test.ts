import { pair, unpair } from "./number-pair"

test("szudzik pair", () => {
  const existing = new LuaSet<number>()
  for (const x of $range(-10, 10)) {
    for (const y of $range(-10, 10)) {
      const z = pair(x, y)
      const [x1, y1] = unpair(z)
      assert.equal(x, x1)
      assert.equal(y, y1)
      assert.is_false(existing.has(z))
      assert.is_true(z >= 0)

      existing.add(z, true)
    }
  }
})
