import assert from 'node:assert';
import test, { describe } from 'node:test';
import { solveFirstPart } from './part1.mjs';
import { solveSecondPart } from './part2.mjs';

test('day 03 p2 should return 467835', async t => {
    const result = solveSecondPart('part1-example.txt');
    assert.equal(result, 467835);
});

test('day 03 p2 should return 80179647 for input data', async t => {
    const result = solveSecondPart('part2-input.txt');
    assert.equal(result, 80179647);
});
