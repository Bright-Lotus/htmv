import type { InputTest } from "../types";

export default {
	root: {
		type: "root",
		children: [
			{ type: "text", text: "<h1 " },
			{ type: "text", text: "class='example'" },
			{ type: "attr-binding", name: "checked", expr: "abc" },
			{ type: "text", text: "class='example'" },
			{ type: "attr-binding", name: "checked", expr: "abc" },
			{ type: "text", text: "class='example'" },
			{ type: "attr-binding", name: "checked", expr: "abc" },
			{ type: "text", text: ">" },
			{ type: "text", text: "Inside" },
			{ type: "text", text: "</h1>" },
		],
	},
	context: { abc: 100 },
} as InputTest;
