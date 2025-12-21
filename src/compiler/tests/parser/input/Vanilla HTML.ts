import type { Token } from "../../../tokenizer";

export default [
	{
		type: "open",
		tag: "p",
	},
	{
		type: "text",
		text: "Inner contents of a p tag",
	},
	{
		type: "close",
		tag: "p",
	},
] as Token[];
