import fs from "node:fs/promises";
import path from "node:path";
import { viewsPath } from "./views";

export const viewRegistry: Record<string, string> = {};

export function addToViewRegistry(name: string, code: string) {
	viewRegistry[name] = code;
	console.log("Registered view", name, "with code:");
	console.log(code);
}

export async function registerViews() {
	const files = await deepReadDir(viewsPath);
	for (const file of files) {
		if (file.endsWith(".html")) {
			const relativePath = path.relative(viewsPath, file);
			const name = relativePath.slice(0, -".html".length);
			const code = await fs.readFile(file, "utf-8");
			addToViewRegistry(name, code);
		}
	}
}

async function deepReadDir(dir: string): Promise<string[]> {
	const entries = await fs.readdir(dir, { withFileTypes: true });

	const files: string[] = [];

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			files.push(...(await deepReadDir(fullPath)));
		} else if (entry.isFile()) {
			files.push(fullPath);
		}
	}

	return files;
}
