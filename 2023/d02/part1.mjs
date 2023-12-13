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

export function solveFirstPart(input = "example-part-1.txt") {
  const fileContent = fs.readFileSync(path.resolve(__dirname, input), "utf8");

  const parsedInput = parseInput(fileContent);

  const impossibleGames = parsedInput.filter((gameResult) => {
    return gameResult.sets.some((set) => {
      return set.some((item) => {
        const limit = limits[item.color];
        return limit && item.amount > limit;
      });
    });
  });

  const result = parsedInput
    .filter((it) => !impossibleGames.includes(it))
    .map((it) => it.gameId)
    .reduce((acc, cur) => acc + cur, 0);
  return result;
}
