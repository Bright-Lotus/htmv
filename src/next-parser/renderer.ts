type Node = RootNode | TextNode | InterpolationNode | IssetNode;

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
