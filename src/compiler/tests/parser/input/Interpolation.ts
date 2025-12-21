import type { Token } from "../../../tokenizer";

export default [
	{
		type: "open",
		tag: "h3",
	},
	{
		type: "arguments",
		value: "example=250",
	},
	{
		type: "text",
		text: "Interpolated value: ",
	},
	{
		type: "interpolation",
		value: "secret_value.x.y.z",
	},
	{
		type: "close",
		tag: "h3",
	},
] as Token[];
