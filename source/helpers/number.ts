export function roundNumber(number: number, decimalPlaces: number): number {
	const exponent = Number(`${number}e${decimalPlaces}`);

	return Number(`${Math.round(exponent)}e-${decimalPlaces}`);
}

export function getRandomIntNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomNumber(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

interface GetPercentageOptions {
	/** @description How many decimal places it should round to? */
	roundTo?: number;
}

export function getPercentage(
	piece: number,
	total: number,
	options?: GetPercentageOptions,
): number {
	const percentage = (piece * 100) / total;

	return options?.roundTo
		? roundNumber(percentage, options.roundTo)
		: percentage;
}

export function isZero(number: number): boolean {
	return number === 0;
}
