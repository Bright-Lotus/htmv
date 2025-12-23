export type HttpResponse = {
	status: number;
	headers: Record<string, string>;
	body: string;
};

type ResponseLike = string | object | HttpResponse;

function resolveResponse(result: ResponseLike): Response {
	if (typeof result === "string") {
		return new Response(result, {
			headers: { "Content-Type": "text/html; charset=utf-8" },
		});
	}
}
