import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// ---
// What is the lowest location number that corresponds to any of the initial seed numbers?
export function solveSecondPart(input = 'part1-example.txt') {
    const fileContent = fs.readFileSync(path.resolve(__dirname, input), 'utf8');
    const { maps, ranges: seedRanges } = parseAlmanac(fileContent);

    const results = maps.reduce((ranges, mappings) => {
        const result = ranges.flatMap(range => {
            return processMap(mappings, range);
        });
        return [...new Set(result)];
    }, seedRanges);

    const answer = Math.min(...results.map(it => it[0]));
    return answer;
}

/**
 *
 * @param {{source, dest, length}[]} mappings
 * @param {number[]} seedRange
 * @returns
 */
function processMap(mappings, seedRange) {
    const result = mappings.flatMap(mapping => {
        const sourceRange = [mapping.source, mapping.source + mapping.length - 1];
        const minLeft = Math.max(sourceRange[0], seedRange[0]);
        const minRight = Math.min(sourceRange[1], seedRange[1]);
        if (minLeft < minRight) {
            const diff = mapping.dest - sourceRange[0];
            return [[minLeft + diff, minRight + diff]];
        }

        return [];
    });
    return result.length ? result : [seedRange];
}

/**
 * @param {string} fileContent
 */
function parseAlmanac(fileContent) {
    const sections = fileContent.split('\n\n');
    const seedsLine = sections.shift();
    const seeds = seedsLine
        .split(':')
        .at(-1)
        .split(' ')
        .filter(it => it.trim())
        .map(it => +it.trim());
    const ranges = [];
    while (seeds.length > 0) {
        const [start, steps] = seeds.splice(0, 2);
        // [from, to]
        ranges.push([start, start + steps - 1]);
    }
    return {
        ranges: ranges,
        maps: sections.map(it => {
            const mapping = it.split('\n');
            mapping.shift();
            return mapping.map(it => {
                const [dest, source, length] = it.split(' ');
                return { dest: +dest, source: +source, length: +length };
            });
        }),
    };
}
