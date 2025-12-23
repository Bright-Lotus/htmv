type HttpResponse = {
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

	if (isHttpResponse(result)) {
		return new Response(result.body, {
			status: result.status,
			headers: result.headers,
		});
	}

	return new Response(JSON.stringify(result), {
		headers: { "Content-Type": "application/json; charset=utf-8" },
	});
}

function isHttpResponse(value: object): value is HttpResponse {
	if (value === null) return false;
	if (!("status" in value) || typeof value.status !== "number") return false;
	if (!("headers" in value) || typeof value.headers !== "object") return false;
	if (!("body" in value) || typeof value.body !== "string") return false;
	return true;
}
