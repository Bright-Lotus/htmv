export type HttpResponse = {
	status: number;
	headers: Record<string, string>;
	body: string;
};

type ResponseLike = string | object | HttpResponse;

function resolveResponse(result: ResponseLike): Response {}
