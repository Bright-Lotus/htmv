import fs from "node:fs/promises";
import path from "node:path";
import type Elysia from "elysia";
import { resolveResponse } from "./http/response";
import type { RouteFn } from "./types";

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
		const module = (await import(fullPath)) as Record<string, unknown>;
		const defaultFn = module.default;
		if (defaultFn && typeof defaultFn === "function") {
			app.all(prefix, async ({ request, query, params }) => {
				const result = await defaultFn({ request, query, params });
				return resolveResponse(result);
			});
		}
		for (const propName in module) {
			const prop = module[propName];
			if (typeof prop !== "function") continue;
			const fn = prop as RouteFn;
			const name = fn.name.toLowerCase();
			if (!["get", "post", "put", "patch", "delete"].includes(name)) continue;
			registerRoute(app, name as "get", prefix, fn);
		}
	}
}

function registerRoute(
	app: Elysia,
	method: "get" | "post" | "put" | "patch" | "delete" | "all",
	path: string,
	fn: RouteFn,
) {
	app[method as "get"](path, async ({ request, query, params }) => {
		const result = await fn({ request, query, params });
		return resolveResponse(result);
	});
}
