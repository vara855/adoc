import assert from 'node:assert';
import test, { describe } from 'node:test';
import { solveFirstPart } from './part1.mjs';

test('day 05 should return 35', async t => {
    const result = solveFirstPart('part1-example.txt');
    assert.equal(result, 35);
});

test('day 05 should return 486613012 for input data', async t => {
    const result = solveFirstPart('part1-input.txt');
    assert.equal(result, 486613012);
});
