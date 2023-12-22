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

function isSymbol(symbol) {
    if (symbol === '.') {
        return false;
    }
    if (correctDigit(symbol)) {
        return false;
    }
    return true;
}

export function solveFirstPart(input = 'part1-example.txt') {
    const fileContent = fs.readFileSync(path.resolve(__dirname, input), 'utf8');

    const lines = fileContent.split('\n').map(it => it.split(''));
    const numbers = [];
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        let chars = '';
        let adjacentToSymbol = false;
        for (let x = 0; x < line.length; x++) {
            const symbol = line[x];

            if (correctDigit(symbol)) {
                chars += symbol;
                if (!adjacentToSymbol) {
                    const neighbours = getNeighbours(x, y, lines);
                    adjacentToSymbol = neighbours.some(it => isSymbol(it));
                }
                if (x === line.length - 1 && adjacentToSymbol) {
                    numbers.push(+chars);
                }
            } else {
                if (adjacentToSymbol && chars.length > 0) {
                    numbers.push(+chars);
                }
                adjacentToSymbol = false;
                chars = '';
            }
        }
    }

    return numbers.reduce((acc, n) => (acc += n), 0);
}

function getNeighbours(x, y, lines) {
    return [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        //
        [x - 1, y],
        [x + 1, y],
        //
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
    ]
        .map(([x, y]) => lines.at(y)?.at(x))
        .filter(it => it);
}
