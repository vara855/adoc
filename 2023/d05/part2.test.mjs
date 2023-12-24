import assert from 'node:assert';
import test from 'node:test';
import { solveSecondPart } from './part2.mjs';

test('day 05 p2 should return 46', async t => {
    const result = solveSecondPart('part1-example.txt');
    assert.equal(result, 46);
});

test('day 05 p2 should return 56931769 for input data', async t => {
    const result = solveSecondPart('part1-input.txt');
    assert.equal(result, 56931769);
});
