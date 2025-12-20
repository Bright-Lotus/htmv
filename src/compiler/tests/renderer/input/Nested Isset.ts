import type { InputTest } from "../types";

export default {
	root: {
		type: "root",
		children: [
			{
				type: "isset",
				itemName: "a",
				children: [
					{
						type: "isset",
						itemName: "b",
						children: [
							{
								type: "text",
								text: "This text should be visible. The secret code is: ",
							},
							{
								type: "interpolation",
								value: "a",
							},
							{
								type: "text",
								text: " ",
							},
							{
								type: "interpolation",
								value: "b",
							},
							{
								type: "isset",
								itemName: "c",
								children: [
									{
										type: "text",
										text: "This text however, must NOT.",
									},
								],
							},
						],
					},
				],
			},
		],
	},
	context: { a: "hello", b: "world", c: false },
} as InputTest;
