type Node = RootNode | TextNode | InterpolationNode;

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
