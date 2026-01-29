import { Elysia } from "elysia";
import { isMethod } from "./helpers.js";
import { registerRoute } from "./routes-handler.js";
import type { Method, RouteFn } from "./types.js";
import { resolve } from "node:path"
import { pathToFileURL } from 'node:url';

export async function registerModuleRoutes(
	app: Elysia,
	prefix: string,
	path: string,
) {
	path = pathToFileURL(resolve(path.replaceAll("\\", "/"))).href;
	const module = (await import(path)) as Record<string, unknown>;
	for (const propName in module) {
		const prop = module[propName];
		if (typeof prop !== "function") continue;
		const fn = prop as RouteFn;
		const name = fn.name.toLowerCase();
		const method: Method | undefined = isMethod(name)
			? name
			: (propName === "default")
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
