import type { Token } from "../../../tokenizer";

export default [
	{ type: "open", tag: "p" },
	{ type: "arguments", value: 'value="i' },
	{ type: "arguments", value: "am" },
	{ type: "arguments", value: "the" },
	{ type: "arguments", value: 'value"' },
	{ type: "arguments", value: 'hello="i' },
	{ type: "arguments", value: "am" },
	{ type: "arguments", value: "another" },
	{ type: "arguments", value: 'value"' },
	{ type: "close", tag: "p" },
] as Token[];
