import assert from 'node:assert';
import test, { describe } from 'node:test';
import { solveFirstPart } from './part1.mjs';

test('day 03 should return 4361', async t => {
    const result = solveFirstPart('part1-example.txt');
    assert.equal(result, 4361);
});

test('day 03 should return 551094 for input data', async t => {
    const result = solveFirstPart('part1-input.txt');
    assert.equal(result, 551094);
});
