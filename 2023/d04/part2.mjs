import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// ---

export function solveSecondPart(input = 'part1-example.txt') {
    const fileContent = fs.readFileSync(path.resolve(__dirname, input), 'utf8');
    const cards = fileContent.split('\n').map(line => parseCard(line));

    const counts = Array.from({ length: cards.length }, () => 1);
    cards.forEach((card, i) => {
        const numberOfWinners = numberOfWinNumbers(card);
        for (let j = 0; j < numberOfWinners; j++) {
            counts[i + j + 1] += counts[i];
        }
    });
    return counts.reduce((acc, a) => acc + a, 0);
}

function numberOfWinNumbers(card) {
    const { data } = card;
    const { winners, current } = data;
    return current.filter(symbol => winners.includes(symbol)).length;
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
        cardNumber: +name.split(' ').at(-1),
        data: {
            winners,
            current,
        },
    };
}
