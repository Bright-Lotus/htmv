import fs from "node:fs/promises";
import path from "node:path";
import { exists } from "../utils.js";

export default async (args: string[]) => {
	const [type, name, ...options] = args;
	if (type === undefined || name === undefined)
		return console.error(
			"You must specify both a type and name of file to generate.\nCorrect usage: htmv gen {TYPE} {NAME} {OPTIONS}",
		);
	if (!["view", "route"].includes(type.toLowerCase()))
		return console.error("Invalid type inputted. Valid types are: view, route");
	if (type.toLowerCase() === "view") {
		let viewsFolderPath = path.resolve("views");
		if (options.length >= 1) {
			const [optionName, optionValue] = options;
			if (optionName === undefined)
				return console.error("No option name provided.");
			if (optionName !== "--path")
				return console.error(
					"Invalid option provided. Valid options are: --path.",
				);
			if (optionValue === undefined)
				return console.error("No option value provided.");
			viewsFolderPath = path.resolve(optionValue);
		}
		const viewsFolderExists = await exists(viewsFolderPath);
		if (!viewsFolderExists)
			return console.error(
				"Unable to find views folder. Did you change your views folder's name? If so, did you pass the option --path with the corresponding path to it?",
			);
		const viewsContents = `<!DOCTYPE html>
<html lang="en">

<head>
  <title>${name} view</title>
</head>

<body>
  <h1>This view was quickly generated with htmv gen.</h1>
</body>
</html>`;
		await generateFile(viewsFolderPath, viewsContents);
	}
};

async function generateFile(_path: string, contents: string) {
	await fs.writeFile(_path, contents);
}
