import type { ResponseLike } from "../http/response";

export type RouteFn = (_: RouteParams) => ResponseLike | Promise<ResponseLike>;
export type Method = "get" | "post" | "put" | "patch" | "delete" | "all";
