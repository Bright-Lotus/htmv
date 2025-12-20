import type { InputTest } from "../types";

export default {
	root: {
		type: "root",
		children: [
			{
				type: "text",
				text: "<h1 class='colored'>",
			},
			{
				type: "text",
				text: "\n",
			},
			{
				type: "text",
				text: "This is a simple test",
			},
			{
				type: "text",
				text: "\n",
			},
			{
				type: "text",
				text: "</h1>",
			},
			{
				type: "text",
				text: "\n",
			},
			{
				type: "text",
				text: "<img src='...' width='50px' height='200px'>",
			},
		],
	},
} as InputTest;
