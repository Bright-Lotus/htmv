import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "./compiler/parser";
import { render } from "./compiler/renderer";
import { tokenize } from "./compiler/tokenizer";
import { resolveResponse } from "./http/response";

let viewsPath = "";

export function setViewsPath(path: string) {
	viewsPath = path;
}

export async function view(view: string, props: Record<string, unknown>) {
	if (viewsPath === "")
		throw new Error(
			"Views folder path not yet configured. Use `Htmv.setup` before rendering a view.",
		);
	const filePath = path.join(viewsPath, `${view}.html`);
	const code = await fs.readFile(filePath, "utf-8");
	const tokens = tokenize(code);
	const root = parse(tokens);
	const rendered = render(root, props);
	return resolveResponse(rendered);
}
