import type { AppLayout } from "$pages/_app";

import manifest from "$public/manifest.json";

type AppRouteConstructor = Omit<AppRoute, "getHoverTitle">;

class AppRoute {
	public getPath: (slug?: string) => string;
	public getTitle: (name?: string) => string;
	public layout: AppLayout;

	constructor({
		layout,
		getPath,
		getTitle,
	}: AppRouteConstructor) {
		this.getPath = getPath;
		this.getTitle = getTitle;
		this.layout = layout;
	}

	getHoverTitle(name = ""): string {
		return `Go to ${this.getTitle(name)} page`;
	}
}

export const APP = {
	name: manifest.name,

	colors: {
		theme: manifest.theme_color,
	},

	fonts: {
		sans: "Manrope",
		serif: "Newsreader",
		monospace: "Fira Code",
		googleURL:
			"https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap",
	},

	routes: {
		home: new AppRoute({
			layout: "default",
			getPath: () => "/",
			getTitle: () => "Home",
		}),
	},
} as const;

export type AppRouteName = keyof typeof APP["routes"];

export const APP_ROUTE_NAMES = Object.keys(APP.routes) as Array<AppRouteName>;

export const APP_ROUTES_MAP = new Map<AppRouteName, string>(
	APP_ROUTE_NAMES.map((name) => {
		const path = APP.routes[name].getPath;

		return [name, typeof path === "string" ? path : path()];
	}),
);
