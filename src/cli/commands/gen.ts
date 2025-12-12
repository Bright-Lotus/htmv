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
		const viewsFolderPath = await validateOptions("views", ...options);
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
	if (type.toLowerCase() === "route") {
		const routesFolderPath = await validateOptions("route", ...options);
		const routeContents = `import { type RouteParams } from "htmv";

export default (_params: RouteParams) => {
	return "Just a simple ALL method.";
};

export function POST (_params: RouteParams) => {
	return "Searching for something more specific? How about a POST method route?"
};
`;
		await generateFile(routesFolderPath, routeContents);
	}
};

async function generateFile(_path: string, contents: string) {
	await fs.writeFile(_path, contents);
}

async function validateOptions(
	folderName: string,
	optionName?: string,
	optionValue?: string,
) {
	let folderPath = path.resolve(folderName);
	if (optionName) {
		if (optionName !== "--path") {
			console.error("Invalid option provided. Valid options are: --path.");
			process.exit(1);
		}

		if (optionValue === undefined) {
			console.error("No option value provided.");
			process.exit(1);
		}

		folderPath = path.resolve(optionValue);
	}
	const viewsFolderExists = await exists(folderPath);
	if (!viewsFolderExists) {
		console.error(
			`Unable to find ${folderName} folder. Did you change your ${folderName} folder's name? If so, did you pass the option --path with the corresponding path to it?`,
		);
		process.exit(1);
	}
	return folderPath;
}
