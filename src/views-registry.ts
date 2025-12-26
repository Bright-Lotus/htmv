export const viewRegistry: Record<string, string> = {};

export function addToViewRegistry(name: string, code: string) {
	viewRegistry[name] = code;
}
