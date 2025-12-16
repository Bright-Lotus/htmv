type Node = RootNode;

interface RootNode {
	type: "root";
	children: Node[];
}
