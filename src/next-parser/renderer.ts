type Node = RootNode | TextNode | InterpolationNode | IssetNode | ForNode;

export interface RootNode {
	type: "root";
	children: Node[];
}

interface TextNode {
	type: "text";
	text: string;
}

interface InterpolationNode {
	type: "interpolation";
	value: string;
}

interface IssetNode {
	type: "isset";
	itemName: string;
	children: Node[];
}

interface ForNode {
	type: "for";
	listName: string;
	itemName: string;
	children: Node[];
}

export function render(node: Node, context: Record<string, unknown>): string {
	if (node.type === "text") {
		return node.text;
	}
	if (node.type === "for") {
		const list = context[node.listName];
		if (Array.isArray(list)) {
			const output = list.map((item) => {
				return node.children
					.map((childrenNode) =>
						render(childrenNode, { ...context, [node.itemName]: item }),
					)
					.join("");
			});
			return output.join("");
		}
		throw new Error("La lista pasada no es un array");
	}
	if (node.type === "interpolation") {
		return String(context[node.value]);
	}
	if (node.type === "isset") {
		if (
			context[node.itemName] !== undefined &&
			context[node.itemName] !== null
		) {
			return node.children.map((node) => render(node, context)).join("");
		}
		return "";
	}
	const output = node.children.map((node) => render(node, context));
	return output.join("");
}
