import type { ClassValue } from "clsx";

export const THEME_COLORS = [
	"red",
	"volcano",
	"orange",
	"gold",
	"yellow",
	"lime",
	"green",
	"cyan",
	"blue",
	"geekblue",
	"purple",
	"magenta",
	"gray",
] as const;
/**
 * @description Available theme color names in the project.
 */
export type ThemeColor = typeof THEME_COLORS[number];

export function getColorFromHashId(id: number | string): ThemeColor {
	const hash32bit = Math.abs(
		[...String(id)].reduce(
			(accumulator, currentValue) =>
				(accumulator << 5) -
				accumulator +
				(currentValue.codePointAt(0) || 0),
			0,
		),
	);
	const indexFromHash = hash32bit % THEME_COLORS.length;
	const color = THEME_COLORS[indexFromHash];

	if (color) {
		return color;
	} else {
		throw new Error("Something went wrong with getting color from hash.");
	}
}

export function setThemeColorCSS(
	theme: ThemeColor,
	reverse = false,
): ClassValue {
	return {
		[theme]: true,
		[`${theme}_reversed`]: reverse,
	};
}
