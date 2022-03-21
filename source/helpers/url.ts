import Case from "case";

export function stripSlash(url: string): string {
	return url[0] === "/" ? url.slice(1) : url;
}

export function getLabelFromURL(url: string) {
	return Case.capital(stripSlash(url));
}
