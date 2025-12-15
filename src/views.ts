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
		.replace(
			/<For\s+(\w+)\s+in\s+(\w+)>([\s\S]*?)<\/For>/g,
			(_, itemName: string, listName: string, innerContent: string) => {
				const list = props[listName];
				if (!Array.isArray(list))
					throw new Error(
						`${listName} on view ${view} is not an array. If you wish for the For to not do anything pass an empty array instead.`,
					);

				return list
					.map((item) =>
						innerContent.replace(
							new RegExp(`{${itemName}}`, "g"),
							String(item),
						),
					)
					.join("");
			},
		)
		.replace(/{(\w+)}/g, (_, propName) => {
			return props[propName] as string;
		})
		.replace(
			/<Isset\s+(!?\w+)>([\s\S]*?)<\/Isset>/g,
			(_, propNameWithPrefix: string, innerContent: string) => {
				const isNegated = propNameWithPrefix.startsWith("!");
				const propName = isNegated
					? propNameWithPrefix.slice(1)
					: propNameWithPrefix;
				const exists =
					props[propName] !== undefined && props[propName] !== null;

				if (isNegated ? !exists : exists) return innerContent;
				return "";
			},
		);
	return new Response(replacedCode, {
		headers: { "Content-Type": "text/html; charset=utf-8" },
	});
}
