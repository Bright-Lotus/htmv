import path from "node:path";
import { tokenize } from "../../tokenizer";

const fileName = process.argv[2];
if (fileName === undefined) throw new Error("Missing input test file name");
const input = await Bun.file(
	path.resolve(import.meta.dir, "input", fileName),
).text();
const tokens = tokenize(input);
Bun.write(
	path.resolve(import.meta.dir, "output", `${fileName}.json`),
	JSON.stringify(tokens),
);
