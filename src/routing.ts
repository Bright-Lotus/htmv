import fs from "node:fs/promises";
import path from "node:path";
import type Elysia from "elysia";
import { resolveResponse } from "./http/response";
import type { RouteFn } from "./types";

type Method = "get" | "post" | "put" | "patch" | "delete" | "all";

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
			registerRoute({
				app,
				method: "all",
				path: prefix,
				fn: defaultFn as RouteFn,
			});
		}
		for (const propName in module) {
			const prop = module[propName];
			if (typeof prop !== "function") continue;
			const fn = prop as RouteFn;
			const name = fn.name.toLowerCase();
			if (isMethod(name)) {
				registerRoute({ app, method: name, path: prefix, fn });
			}
		}
	}
}

type RegisterRouteParams = {
	app: Elysia;
	method: Method;
	path: string;
	fn: RouteFn;
};

function registerRoute({ app, method, path, fn }: RegisterRouteParams) {
	app[method as "get"](path, async ({ request, query, params }) => {
		const result = await fn({ request, query, params });
		return resolveResponse(result);
	});
}

function isMethod(value: string): value is Method {
	return ["get", "post", "put", "patch", "delete", "all"].includes(value);
}
