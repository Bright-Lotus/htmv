import type { Token } from "../../../tokenizer";

export default [
	{
		type: "open",
		tag: "input",
	},
	{
		type: "attr-binding",
		name: "checked",
		expression: "shouldBeChecked",
	},
	{
		type: "open",
		tag: "p",
	},
	{
		type: "text",
		text: "This will only appear checked when shouldBeChecked is truthy",
	},
	{
		type: "close",
		tag: "p",
	},
] as Token[];
