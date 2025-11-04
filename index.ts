import fs from "node:fs/promises";
import path from "node:path";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";

let viewsPath = "";

export async function view(view: string, props: Record<string, unknown>) {
	if (viewsPath === "")
		throw new Error(
			"Views folder path not yet configured. Use `Htmv.setup` before rendering a view.",
		);
	const file = Bun.file(path.join(viewsPath, `${view}.html`));
	const code = await file.text();
	const replacedCode = code.replace(/{(.+)}/g, (_, propName) => {
		return props[propName] as string;
	});
	return new Response(replacedCode, {
		headers: { "Content-Type": "text/html; charset=utf-8" },
	});
}

export type RouteParams = {};

type Paths = {
	routes: string;
	views: string;
	public: string;
	port: number;
};
export async function setup(paths: Paths) {
	viewsPath = paths.views;
	const module = await import(path.join(paths.routes, "index.ts"));
	const fn = module.default;
	const app = new Elysia()
		.use(
			staticPlugin({
				assets: paths.public,
			}),
		)
		.get("/", () => {
			return fn();
		});

	await registerRoutes(app, paths.routes);
	app.listen(paths.port);
	console.log("");
	console.log(`HTMV running on port ${paths.port}! 🎉`);
	console.log(`http://localhost:${paths.port}`);
}

async function registerRoutes(app: Elysia, baseDir: string, prefix = "/") {
	const entries = await fs.readdir(baseDir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(baseDir, entry.name);
		if (entry.isDirectory()) {
			await registerRoutes(app, fullPath, path.join(prefix, entry.name));
			continue;
		}
		if (entry.name !== "index.ts") continue;
		const module = await import(fullPath);
		const fn = module.default;
		app.get(prefix, fn);
		console.log(`Registered ${fullPath} on ${prefix} route`);
	}
}
