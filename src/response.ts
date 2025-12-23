type Headers = Record<string, string>;

type HttpResponse = {
	status: number;
	headers?: Headers;
	body?: string;
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
	body?: string | object,
	headers?: Headers,
): HttpResponse {
	return requestHelper(400, body, headers);
}

export function Created(
	body?: string | object,
	headers?: Headers,
): HttpResponse {
	return requestHelper(201, body, headers);
}

function requestHelper(
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
