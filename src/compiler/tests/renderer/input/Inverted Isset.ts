import type { InputTest } from "../types";

export default {
	root: {
		type: "root",
		children: [
			{
				type: "isset",
				itemName: "!a",
				children: [
					{
						type: "text",
						text: "This text should NOT be visible",
					},
				],
			},
			{
				type: "isset",
				itemName: "!b",
				children: [
					{
						type: "text",
						text: "This text should be visible (b)",
					},
				],
			},
			{
				type: "isset",
				itemName: "!c",
				children: [
					{
						type: "text",
						text: "The array is empty however the question has been inverted. This text should be visible",
					},
				],
			},
		],
	},
	context: { a: true, b: false, c: [] },
} as InputTest;
