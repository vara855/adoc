import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// ---

export function solveFirstPart(input = 'part1-example.txt') {
    const fileContent = fs.readFileSync(path.resolve(__dirname, input), 'utf8');
    const lines = fileContent.split('\n');

    let total = 0;

    lines.forEach(line => {
        const { data } = parseCard(line);
        const { winners, current } = data;
        let points = 0;
        current.forEach(symbol => {
            if (winners.includes(symbol)) {
                if (points <= 1) {
                    points += 1;
                } else {
                    points *= 2;
                }
            }
        });
        total += points;
    });
    return total;
}

function parseCard(line = '') {
    const [name, cols] = line.split(':');
    const [winners, current] = cols.split('|').map(it =>
        it
            .split(' ')
            .map(it => it.trim())
            .filter(it => it)
    );

    return {
        name,
        data: {
            winners,
            current,
        },
    };
}
