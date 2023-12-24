import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// ---
// What is the lowest location number that corresponds to any of the initial seed numbers?
export function solveFirstPart(input = 'part1-example.txt') {
    const fileContent = fs.readFileSync(path.resolve(__dirname, input), 'utf8');
    const { maps, seeds } = parseAlmanac(fileContent);

    const result = seeds.map(seed => {
        return maps.reduce((coord, map) => {
            const _coord = processMap(map, coord);
            return _coord;
        }, seed);
    });
    return Math.min(...result);
}

function processMap(mappings, seed) {
    for (let { source, dest, length } of mappings) {
        if (seed >= source && seed < source + length) {
            return dest + (seed - source);
        }
    }
    return seed;
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
    console.log('sections :>> ', sections);

    return {
        seeds,
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
