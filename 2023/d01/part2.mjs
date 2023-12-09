import fs from "node:fs";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const wordDigits = {
  one: "o1e",
  two: "t2w",
  three: "t3e",
  four: "f4r",
  five: "f5i",
  six: "s6x",
  seven: "s7e",
  eight: "e8t",
  nine: "n9e",
};
function isValidDigit(n) {
  return !isNaN(+n) && isFinite(n);
}

/**
 *
 * @param {string} text
 * @returns {string[]}
 */
function prepareLines(text) {
  Object.keys(wordDigits).forEach((key) => {
    text = text.replaceAll(key, wordDigits[key]);
  });

  return text.split("\n");
}

export function solveSecondPart(fileName) {
  const fileContent = fs.readFileSync(
    path.resolve(__dirname, fileName),
    "utf8"
  );

  const lines = prepareLines(fileContent);

  const answer = lines.reduce((acc, line) => {
    const letters = line.split("");
    let fst = letters.find((letter) => isValidDigit(letter));
    let lst = letters.findLast((letter) => isValidDigit(letter));
    let num = +`${fst}${lst}`;
    acc += num;
    return acc;
  }, 0);

  return answer;
}
