import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { node } from "@elysiajs/node";

export function createApp(publicPath: string) {
	const app = new Elysia({ adapter: node() }).use(
		staticPlugin({
			assets: publicPath,
		}),
	);
	app.all("/health", () => "OK");
	return app;
}
