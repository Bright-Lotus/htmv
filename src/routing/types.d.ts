import type { ResponseLike } from "../http/response";

export type RouteFn = (_: RouteParams) => ResponseLike | Promise<ResponseLike>;
