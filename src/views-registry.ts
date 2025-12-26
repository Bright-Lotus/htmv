import { viewsPath } from "./views";
import fs from "node:fs/promises";
import path from "node:path";

export const viewRegistry: Record<string, string> = {};

export function addToViewRegistry(name: string, code: string) {
	viewRegistry[name] = code;
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
