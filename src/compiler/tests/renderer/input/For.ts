import type { InputTest } from "../types";

export default {
	root: {
		type: "root",
		children: [
			{
				type: "for",
				listName: "myList",
				itemName: "item",
				children: [
					{
						type: "interpolation",
						value: "item",
					},
				],
			},
		],
	},
	context: { myList: ["A", "B", "C"] },
} as InputTest;
