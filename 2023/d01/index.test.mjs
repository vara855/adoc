import assert from "node:assert";
import { test } from "node:test";
import { solveFirstPart } from "./index.mjs";

test("should return 142 for example.txt", (t) => {
  const res = solveFirstPart("example.txt");
  assert.equal(res, 142);
});

test("should return X=54159 for test data", (t) => {
  const res = solveFirstPart("input.txt");
  assert.equal(res, 54159);
});
