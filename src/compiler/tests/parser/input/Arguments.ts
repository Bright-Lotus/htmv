import type { Token } from "../../../tokenizer";

export default [
	{
		type: "open",
		tag: "h1",
	},
	{
		type: "arguments",
		value: "class='example'",
	},
	{
		type: "arguments",
		value: "abc=100",
	},
	{
		type: "text",
		text: "Inside",
	},
	{
		type: "close",
		tag: "h1",
	},
] as Token[];
