import fs from "node:fs/promises";
import path from "node:path";

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
	const replacedCode = code
		.replace(/{(.+)}/g, (_, propName) => {
			return props[propName] as string;
		})
		.replace(
			/<Isset\s+(\w+)>([\s\S]*?)<\/Isset>/g,
			(_, propName, innerContent) => {
				if (props[propName] !== undefined && props[propName] !== null)
					return innerContent;
				return "";
			},
		);
	return new Response(replacedCode, {
		headers: { "Content-Type": "text/html; charset=utf-8" },
	});
}
