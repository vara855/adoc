import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// ---

function correctDigit(digit) {
    if (digit >= '0' && digit <= '9') {
        return true;
    }
    return false;
}

export function solveSecondPart(input = 'part1-example.txt') {
    const fileContent = fs.readFileSync(path.resolve(__dirname, input), 'utf8');

    const lines = fileContent.split('\n').map(it => it.split(''));
    let ratio = 0;
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            const symbol = line[x];

            if (symbol === '*') {
                const neighborNumbers = getNeighborNumbers(x, y, lines);
                if (neighborNumbers.length === 2) {
                    ratio += neighborNumbers.at(0) * neighborNumbers.at(1);
                }
            }
        }
    }

    return ratio;
}

function getNeighborNumbers(x, y, lines) {
    const [top, sides, bottom] = [
        // top
        [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
        ],
        //
        [
            [x - 1, y], //left
            [x + 1, y], //right
        ],
        // bottom
        [
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1],
        ],
    ];
    const numbers = new Set();

    [top, sides, bottom].forEach(coord => {
        if (numbers.size > 2) return;
        coord.forEach(([x, y]) => {
            const number = getNumber(x, y, lines);
            if (numbers.size > 2) return;
            if (number) {
                numbers.add(+number);
            }
        });
    });
    return [...numbers];
}

function getNumber(x, y, lines, back = true, forward = true) {
    let seq = '';
    const char = lines.at(y)?.at(x);
    if (correctDigit(char)) {
        seq += char;
        if (back) {
            const prev = getNumber(x - 1, y, lines, true, false);
            if (prev) {
                seq = prev + seq;
            }
        }
        if (forward) {
            const next = getNumber(x + 1, y, lines, false, true);
            if (next) {
                seq = seq + next;
            }
        }
    } else {
        return;
    }
    return seq;
}
