type Node = RootNode | TextNode;

interface RootNode {
	type: "root";
	children: Node[];
}

interface TextNode {
	type: "text";
	text: string;
}
