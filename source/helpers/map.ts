export function getMapFromList<Data, Key extends keyof Data>(
	array: Array<Data>,
	keyPointer: Key,
): Map<Data[Key], Data> {
	return new Map(array.map((data) => [data[keyPointer], data]));
}

export function isMapEmpty(map: Map<unknown, unknown>): boolean {
	if (map instanceof Map) {
		return map.size === 0;
	} else {
		throw new TypeError("The provided argument is not a Map!");
	}
}
