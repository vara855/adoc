import fs from "node:fs";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

function isValidDigit(n) {
  return !isNaN(+n) && isFinite(n);
}

export function solveFirstPart(fileName) {
  const fileContent = fs.readFileSync(
    path.resolve(__dirname, fileName),
    "utf8"
  );

  const lines = fileContent.split("\n");

  const answer = lines.reduce((acc, line) => {
    let num;
    const letters = line.split("");
    let fst = letters.find((letter) => isValidDigit(letter));
    let lst = letters.findLast((letter) => isValidDigit(letter));
    num = +`${fst}${lst}`;

    acc += num;
    return acc;
  }, 0);

  return answer;
}
