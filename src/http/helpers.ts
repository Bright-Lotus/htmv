import { type Headers, type HttpResponse, requestHelper } from "./response";

export function httpResponse(response: HttpResponse) {
	return response;
}

export function badRequest(body?: string | object, headers?: Headers) {
	return requestHelper(400, body, headers);
}

export function created(body?: string | object, headers?: Headers) {
	return requestHelper(201, body, headers);
}

export function ok(body?: string | object, headers?: Headers) {
	return requestHelper(200, body, headers);
}

export function noContent(headers?: Headers) {
	return requestHelper(204, undefined, headers);
}
