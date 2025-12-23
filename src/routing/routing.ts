import fs from "node:fs/promises";
import path from "node:path";
import type Elysia from "elysia";
import { registerModuleRoutes } from "./modules-handler";

export async function registerRoutes(
	app: Elysia,
	baseDir: string,
	prefix = "/",
) {
	const entries = await fs.readdir(baseDir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(baseDir, entry.name);
		if (entry.isDirectory()) {
			await registerRoutes(app, fullPath, path.join(prefix, entry.name));
			continue;
		}
		if (entry.name !== "index.ts") continue;
		registerModuleRoutes(app, prefix, fullPath);
	}
}
