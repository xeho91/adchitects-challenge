import { isMapEmpty } from "$helpers/map";

export interface PageRecord {
	url: `/${string}`;
	id: string;
}

export type APIResponsePagesList = Array<PageRecord>;

type PagesMap = Map<PageRecord["id"], PageRecord>;

export class PagesList {
	public map: PagesMap;

	constructor(map: PagesMap) {
		this.map = map;
	}

	isEmpty(): boolean {
		return isMapEmpty(this.map);
	}

	get ids(): Array<PageRecord["id"]> {
		return [...this.map.keys()];
	}

	get list(): Array<PageRecord> {
		return [...this.map.values()];
	}

	get urls(): Array<string> {
		return this.list.map(({ url }) => url);
	}
}
