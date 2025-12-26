import { createApp } from "./app";
import { registerRoutes } from "./routing/routing";
import type { Paths } from "./types";
import { setViewsPath } from "./views";
import { registerViews } from "./views-registry";

export type { RouteParams } from "./types";
export { view } from "./views";

export async function setup(paths: Paths) {
	setViewsPath(paths.views);
	await registerViews();
	const app = createApp(paths.public);
	await registerRoutes(app, paths.routes);
	app.listen(paths.port);
	console.log("");
	console.log(`HTMV running on port ${paths.port}! 🎉`);
	console.log(`http://localhost:${paths.port}`);
}
