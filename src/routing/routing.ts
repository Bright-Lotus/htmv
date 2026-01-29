import fs from "node:fs/promises";
import path from "node:path";
import { registerModuleRoutes } from "./modules-handler.js";
import { Elysia } from "elysia";

export async function registerRoutes(
	app: Elysia,
	baseDir: string,
	prefix = "/",
) {
	baseDir = path.resolve(baseDir);
	const entries = await fs.readdir(baseDir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(baseDir, entry.name);
		if (entry.isDirectory()) {
			await registerRoutes(app, fullPath, path.join(prefix, entry.name));
			continue;
		}
		if (entry.name !== "index.js") continue;
		await registerModuleRoutes(app, prefix, fullPath);
	}
}
