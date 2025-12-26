import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "./compiler/parser";
import { render } from "./compiler/renderer";
import { tokenize } from "./compiler/tokenizer";
import type { HttpResponse } from "./http/response";
import { viewRegistry } from "./views-registry";

export let viewsPath = "";

export function setViewsPath(path: string) {
	viewsPath = path;
}

export function view(
	view: string,
	props?: Record<string, unknown>,
): HttpResponse {
	if (viewsPath === "")
		throw new Error(
			"Views folder path not yet configured. Use `Htmv.setup` before rendering a view.",
		);
	const code = viewRegistry[view] ?? "";
	const tokens = tokenize(code);
	const root = parse(tokens);
	const rendered = render(root, props ? props : {});
	return {
		status: 200,
		body: rendered,
		headers: { "Content-Type": "text/html; charset=utf-8" },
	};
}
