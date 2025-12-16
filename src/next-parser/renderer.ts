type Node = RootNode | TextNode | InterpolationNode | IssetNode | ForNode;

interface RootNode {
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

function render(node: Node, context: Record<string, unknown>): string {}
