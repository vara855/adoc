import assert from 'node:assert';
import test from 'node:test';
import { solveSecondPart } from './part2.mjs';

test('day 04 p2 should return 30', async t => {
    const result = solveSecondPart('part1-example.txt');
    assert.equal(result, 30);
});

test('day 04 p2 should return 8477787 for input data', async t => {
    const result = solveSecondPart('part2-input.txt');
    assert.equal(result, 8477787);
});
