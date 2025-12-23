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
		registerModuleRoutes(app, prefix, fullPath);
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

async function registerModuleRoutes(app: Elysia, prefix: string, path: string) {
	const module = (await import(path)) as Record<string, unknown>;
	for (const propName in module) {
		const prop = module[propName];
		if (typeof prop !== "function") continue;
		const fn = prop as RouteFn;
		const name = fn.name.toLowerCase();
		const method: Method | undefined = isMethod(name)
			? name
			: propName === "default"
				? "all"
				: undefined;
		if (method) {
			registerRoute({
				app,
				method,
				path: prefix,
				fn,
			});
		}
	}
}
