import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { registerRoutes } from "./routing";
import type { Paths } from "./types";
import { setViewsPath } from "./views";

export { view } from "./views";

export async function setup(paths: Paths) {
	setViewsPath(paths.views);
	const app = new Elysia().use(
		staticPlugin({
			assets: paths.public,
		}),
	);

	await registerRoutes(app, paths.routes);
	app.listen(paths.port);
	console.log("");
	console.log(`HTMV running on port ${paths.port}! 🎉`);
	console.log(`http://localhost:${paths.port}`);
}
