import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";

export function createApp(publicPath: string) {
	return new Elysia().use(
		staticPlugin({
			assets: publicPath,
		}),
	);
}
