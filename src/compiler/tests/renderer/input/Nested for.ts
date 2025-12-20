import type { InputTest } from "../types";

export default {
	root: {
		type: "root",
		children: [
			{
				type: "for",
				listName: "myList",
				itemName: "item1",
				children: [
					{
						type: "for",
						listName: "myOtherList",
						itemName: "item2",
						children: [
							{
								type: "interpolation",
								value: "item1",
							},
							{
								type: "interpolation",
								value: "item2",
							},
							{
								type: "text",
								text: " ",
							},
						],
					},
				],
			},
		],
	},
	context: { myList: ["A", "B", "C"], myOtherList: [1, 2, 3] },
} as InputTest;
