import type { Node, RootNode } from "./renderer";
import type { Token } from "./tokenizer";

export function parse(tokens: Token[]) {
	let i = 0;

	const root: RootNode = {
		type: "root",
		children: parseChildren(),
	};

	return root;

	function parseChildren(untilTag?: string): Node[] {
		const nodes: Node[] = [];
		while (i < tokens.length) {
			const token = tokens[i];
			if (
				untilTag &&
				token?.type === "close" &&
				token.tag.toLocaleLowerCase() === untilTag
			) {
				i++;
				break;
			}
			if (token?.type === "text") {
				nodes.push({
					type: "text",
					text: token.text,
				});
				i++;
				continue;
			}
			if (token?.type === "interpolation") {
				nodes.push({
					type: "interpolation",
					value: token.value,
				});
				i++;
				continue;
			}
			if (token?.type === "open") {
				const tag = token.tag.toLowerCase();
				i++;
				if (tag === "for") {
					const nextToken = tokens[i]; //should be arguments token
					i++;
					if (nextToken?.type !== "arguments")
						throw new Error("Missing arguments in for");
					const [itemName, _in, listName] = nextToken.value;
					if (
						itemName === undefined ||
						_in === undefined ||
						listName === undefined
					)
						throw new Error(
							"Incorrect amount of arguments in for. Expected 3 arguments",
						);
					if (_in !== "in") throw new Error("Expected reserved word in.");

					const children = parseChildren(tag);
					nodes.push({
						type: "for",
						children,
						itemName,
						listName,
					});
					continue;
				}
				if (tag === "isset") {
					const nextToken = tokens[i]; //should be arguments token
					i++;
					if (nextToken?.type !== "arguments")
						throw new Error("Missing arguments in isset");
					const [itemName] = nextToken.value;
					if (itemName === undefined) throw new Error("Expected item name");
					const children = parseChildren(tag);
					nodes.push({
						type: "isset",
						children,
						itemName,
					});
					continue;
				}
				const nextToken = tokens[i]; //may be arguments token
				if (nextToken?.type === "arguments") {
					nodes.push({
						type: "text",
						text: `<${tag}`,
					});
					parseArgs(nextToken.value);
					nodes.push({
						type: "text",
						text: `>`,
					});
					i++;
					continue;
				}
				nodes.push({
					type: "text",
					text: `<${tag}>`,
				});
				continue;
			}
			if (token?.type === "close") {
				if (token.tag === "for" || token.tag === "isset") continue;
				const tag = token.tag;
				nodes.push({
					type: "text",
					text: `</${tag}>`,
				});
				i++;
			}
		}
		return nodes;
	}

	function parseArgs(args: string[]) {
		let textBuffer = "";
		for (let i = 0; i < args.length; i++) {
			const letter = args[i];
			if (letter === "{") {
				clearBuffer();
				continue;
			}
			if (letter === "}") {
				tokens.push({
					type: "interpolation",
					value: textBuffer,
				});
				clearBuffer();
			}
			textBuffer += letter;
		}

		function clearBuffer() {
			if (textBuffer.length > 0) {
				tokens.push({
					type: "text",
					text: textBuffer,
				});
			}
		}
	}
}
