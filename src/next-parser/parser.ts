import fs from "node:fs/promises";
import type { Node, RootNode } from "./renderer";
import { type Token, tokenize } from "./tokenizer";

function parse(tokens: Token[]) {
	const i = 0;

	const root: RootNode = {
		type: "root",
		children: parseChildren(),
	};

	return root;

	function parseChildren(untilTag?: string): Node[] {}
}

const input = await fs.readFile("test.html", "utf-8");
const tokenized = tokenize(input);
const parsed = parse(tokenized);
console.log(parsed);
