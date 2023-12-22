import assert from 'node:assert';
import test, { describe } from 'node:test';
import { solveFirstPart } from './part1.mjs';

test('day 04 should return 13', async t => {
    const result = solveFirstPart('part1-example.txt');
    assert.equal(result, 13);
});

test('day 04 should return 17782 for input data', async t => {
    const result = solveFirstPart('part1-input.txt');
    assert.equal(result, 17782);
});
