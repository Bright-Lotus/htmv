type Headers = Record<string, string>;

type HttpResponse = {
	status: number;
	headers?: Headers;
	body: string;
};

type ResponseLike = string | object | HttpResponse;

export function resolveResponse(result: ResponseLike): Response {
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

export function HttpResponse(response: HttpResponse) {
	return response;
}

export function BadRequest(
	contents: string | object,
	headers?: Headers,
): HttpResponse {
	return requestHelper(400, contents, headers);
}

function requestHelper(
	status: number,
	contents: string | object,
	headers?: Headers,
): HttpResponse {
	return {
		status,
		body: typeof contents === "string" ? contents : JSON.stringify(contents),
		headers:
			headers !== undefined
				? headers
				: typeof contents === "string"
					? { "Content-Type": "text/plain; charset=utf-8" }
					: { "Content-Type": "application/json; charset=utf-8" },
	};
}
