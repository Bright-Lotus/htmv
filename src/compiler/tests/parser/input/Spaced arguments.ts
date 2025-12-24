import type { Token } from "../../../tokenizer";

export default [
	{ type: "open", tag: "p" },
	{ type: "arguments", value: 'value="i am the value"' },
	{ type: "arguments", value: 'hello="i am another value"' },
	{ type: "close", tag: "p" },
] as Token[];
