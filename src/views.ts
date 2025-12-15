const viewsPath = "";

export async function view(view: string, props: Record<string, unknown>) {
	if (viewsPath === "")
		throw new Error(
			"Views folder path not yet configured. Use `Htmv.setup` before rendering a view.",
		);
	const filePath = path.join(viewsPath, `${view}.html`);
	const code = await fs.readFile(filePath, "utf-8");
	const replacedCode = code.replace(/{(.+)}/g, (_, propName) => {
		return props[propName] as string;
	});
	return new Response(replacedCode, {
		headers: { "Content-Type": "text/html; charset=utf-8" },
	});
}
