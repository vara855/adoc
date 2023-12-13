import assert from "node:assert";
import test, { describe } from "node:test";
import { solveFirstPart } from "./part1.mjs";

test("day 02 should return 8", async (t) => {
  const result = solveFirstPart("example-part-1.txt");
  assert.equal(result, 8);
});

test("day 02 should return 2406", async (t) => {
  const result = solveFirstPart("input-part-1.txt");
  assert.equal(result, 2406);
});
