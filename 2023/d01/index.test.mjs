import assert from "node:assert";
import { test } from "node:test";
import { solveFirstPart } from "./part1.mjs";
import { solveSecondPart } from "./part2.mjs";

test("first part", async () => {
  await test("should return 142 for example-part-1.txt", (t) => {
    const res = solveFirstPart("example-part-1.txt");
    assert.equal(res, 142);
  });

  await test("should return X=54159 for test data", (t) => {
    const res = solveFirstPart("input-part-1.txt");
    assert.equal(res, 54159);
  });
});

test("second part", async () => {
  await test("should return 281 for example-part-2.txt", (t) => {
    const res = solveSecondPart("example-part-2.txt");
    assert.equal(res, 281);
  });

  await test("should return X=53866 for test data", { skip: false }, (t) => {
    const res = solveSecondPart("input-part-2.txt");
    assert.equal(res, 53866);
  });
});
