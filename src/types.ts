export type RouteParams = {
	query: Record<string, string>;
	request: Request;
	params: Record<string, string>;
};

export type Paths = {
	routes: string;
	views: string;
	public: string;
	port: number;
};

export type RouteFn = (_: RouteParams) => unknown;
