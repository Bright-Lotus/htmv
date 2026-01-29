import type Elysia from "elysia";
import { resolveResponse } from "../http/response";
import type { Method, RouteFn } from "./types";

type RegisterRouteParams = {
	app: Elysia;
	method: Method;
	path: string;
	fn: RouteFn;
};

export function registerRoute({ app, method, path, fn }: RegisterRouteParams) {
	app[method as "get"](path, async ({ request, query, params }) => {
		const result = await fn({ request, query, params });
		return resolveResponse(result);
	});
}
