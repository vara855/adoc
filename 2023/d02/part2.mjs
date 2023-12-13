import fs from "node:fs";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
// ---

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

/**
 * @param {string} setsString
 */
function parseSets(setsString) {
  return setsString.split(";").map((set) => {
    return set.split(",").map((item) => {
      const [amount, color] = item.trim().split(" ");
      return {
        amount: +amount,
        color: color,
      };
    });
  });
}

/**
 * @param {string} line
 */
function parseLine(line) {
  const [title, data] = line.split(":");
  return {
    gameId: +title.split(" ").at(-1),
    sets: parseSets(data.trim()),
  };
}
/**
 * @param {string} input
 */
function parseInput(input) {
  const lines = input.split("\n");
  return lines.map((line) => {
    return parseLine(line);
  });
}

export function solveSecondPart(input) {
  const fileContent = fs.readFileSync(path.resolve(__dirname, input), "utf8");

  const games = parseInput(fileContent);

  const result = games
    .map((game) => {
      const minToPossibleMaps = game.sets.flat().reduce(
        (acc, set) => {
          if (acc[set.color] < set.amount) {
            acc[set.color] = set.amount;
          }
          return acc;
        },
        { red: 1, green: 1, blue: 1 }
      );
      const powerOfSet = Object.values(minToPossibleMaps).reduce(
        (acc, it) => (acc *= it),
        1
      );
      return powerOfSet;
    })
    .reduce((acc, cur) => acc + cur, 0);

  return result;
}
