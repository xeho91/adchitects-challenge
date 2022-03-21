export function isString(value: unknown): boolean {
	return typeof value === "string";
}

export function isEmptyString(value: unknown): boolean {
	return isString(value) && (value as string).length === 0;
}
