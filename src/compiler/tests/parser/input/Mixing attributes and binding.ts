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
		type: "attr-binding",
		name: "checked",
		expression: "abc",
	},
	{
		type: "arguments",
		value: "class='example'",
	},
	{
		type: "attr-binding",
		name: "checked",
		expression: "abc",
	},
	{
		type: "arguments",
		value: "class='example'",
	},
	{
		type: "attr-binding",
		name: "checked",
		expression: "abc",
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
