export type Headers = Record<string, string>;

export type HttpResponse = {
	status: number;
	headers?: Headers;
	body?: string;
};

export type ResponseLike = string | object | HttpResponse;

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
	return true;
}

export function requestHelper(
	status: number,
	body?: string | object,
	headers?: Headers,
): HttpResponse {
	if (body === undefined)
		return {
			status,
			headers,
		};
	return {
		status,
		body: typeof body === "string" ? body : JSON.stringify(body),
		headers:
			headers !== undefined
				? headers
				: typeof body === "string"
					? { "Content-Type": "text/plain; charset=utf-8" }
					: { "Content-Type": "application/json; charset=utf-8" },
	};
}
