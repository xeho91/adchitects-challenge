import { getRandomIntNumber } from "$helpers/number";

export function isArrayEmpty(array: unknown[]): boolean {
	if (!Array.isArray(array)) {
		throw new TypeError("The provided value is not an array!");
	} else {
		return array.length === 0;
	}
}

export function getRandomItemFromArray<Type>(
	list: Array<Type> | readonly Type[],
): Type {
	const randomIndex = getRandomIntNumber(0, list.length - 1);
	const pick = list[randomIndex];

	if (pick) {
		return pick;
	} else {
		throw new Error("Something went wrong with picking random item!");
	}
}

export function hasDuplicates(array: unknown[]): boolean {
	return new Set(array).size === array.length;
}
