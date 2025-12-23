import type Elysia from "elysia";
import { isMethod } from "./helpers";
import { registerRoute } from "./routes-handler";
import type { Method, RouteFn } from "./types";

export async function registerModuleRoutes(
	app: Elysia,
	prefix: string,
	path: string,
) {
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
