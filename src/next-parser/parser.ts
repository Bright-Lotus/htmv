import type { RootNode } from "./renderer";
import type { Token } from "./tokenizer";

function parse(tokens: Token[]) {
	const root: RootNode = {
		type: "root",
		children: [],
	};
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (token?.type === "text") {
			root.children.push({
				type: "text",
				text: token.text,
			});
		}
		if (token?.type === "open") {
			const tag = token.tag;
		}
	}
	return root;
}
