import childProcess from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { exists } from "../utils.js";

export default async (args: string[]) => {
	const name = args[0];
	if (name === undefined)
		return console.error("No name supplied. Project creation cancelled");
	console.log("1. Starting project creation...");
	const folderAlreadyExists = await exists(name);
	if (folderAlreadyExists)
		return console.error("There already exists a folder with that name.");
	const fullPath = path.resolve(name);
	await fs.mkdir(name);
	console.log("2. Creating a new bun project...");
	await runCommand("bun init -y", {
		cwd: fullPath,
	});
	console.log("3. Installing dependencies...");
	await runCommand("bun add htmv", {
		cwd: fullPath,
	});
	console.log("4. Scaffolding project structure...");
	await fs.mkdir(path.join(fullPath, "public"));
	await fs.mkdir(path.join(fullPath, "routes"));
	await fs.mkdir(path.join(fullPath, "views"));
	const indexContent = `import path from "node:path";
import { fileURLToPath } from "node:url";
import { setup } from "htmv";

const __filename = fileURLToPath(import.meta.url);
const dirPath = path.dirname(__filename);
setup({
	routes: path.join(dirPath, "routes"),
	views: path.join(dirPath, "views"),
	public: path.join(dirPath, "public"),
	port: 3000,
});`;
	await fs.writeFile(path.join(fullPath, "index.ts"), indexContent);
	const routeContent = `import { type RouteParams, view } from "htmv";

export default async (_params: RouteParams) => {
	return await view("example", {
		title: "Welcome to HTMV!",
	});
};
`;
	await fs.writeFile(path.join(fullPath, "routes", "index.ts"), routeContent);
	const viewContent = `<!DOCTYPE html>
<html lang="en">

<head>
  <title>{title}</title>
</head>

<body>
  <h1>{title}</h1>
</body>
</html>`;
	await fs.writeFile(path.join(fullPath, "views", "example.html"), viewContent);
	console.log("5. Creating run scripts...");
	await runCommand(`npm pkg set scripts.dev="bun --watch ."`, {
		cwd: fullPath,
	});
	await runCommand(`npm pkg set scripts.start="bun index.ts"`, {
		cwd: fullPath,
	});
	console.log("6. Rewriting tsconfig.json...");
	const tsconfig = await fs.readFile(
		path.join(fullPath, "tsconfig.json"),
		"utf-8",
	);
	let tsconfigWithoutStartingBracket = tsconfig.split("\n").slice(1).join("\n");
	tsconfigWithoutStartingBracket = `{
	"exclude": ["public"],
${tsconfigWithoutStartingBracket}`;
	await fs.writeFile(
		path.join(fullPath, "tsconfig.json"),
		tsconfigWithoutStartingBracket,
	);
	console.log(`All done! Project ${name} created.`);
	console.log(`Now run cd ${name} and start building your next big project!`);
};

async function runCommand(
	command: string,
	options?: childProcess.ExecOptionsWithStringEncoding,
) {
	const process = childProcess.exec(command, options);
	return new Promise((resolve) => {
		process.on("exit", () => {
			resolve(1);
		});
	});
}
