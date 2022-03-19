export function isObject(object: object): boolean {
	return object !== null && object.constructor.name === "Object";
}

export function isObjectEmpty(object: object): boolean {
	if (isObject(object)) {
		return Object.entries(object).length === 0;
	} else {
		throw new Error("The provided argument is not an object!");
	}
}

export function mergeObjectsKeys(arrayOfObjects: Array<object>): object {
	// eslint-disable-next-line unicorn/no-array-reduce
	return arrayOfObjects.reduce((accumulator, currentObject) =>
		Object.assign(accumulator, currentObject),
	);
}

export function objectFilter(object: object, valueToFilter: unknown) {
	const entries = Object.entries(object);
	const filtered = entries.filter(([, value]) => value !== valueToFilter);

	return Object.fromEntries(filtered);
}
