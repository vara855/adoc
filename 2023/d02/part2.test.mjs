import assert from "node:assert";
import test, { describe } from "node:test";
import { solveSecondPart } from "./part2.mjs";

test("day 02 part2 should return 2286", async (t) => {
  const result = solveSecondPart("example-part-1.txt");
  assert.equal(result, 2286);
});

test("day 02 part2 should return 78375", async (t) => {
  const result = solveSecondPart("input-part-2.txt");
  assert.equal(result, 78375);
});
