import type { PageRecord } from "$utils/PagesList";

export interface HeroSectionData {
	type: "hero";
	text: string;
	img: string;
}

export interface TestimonialSectionData {
	type: "testimonial";
	text: string;
	author: string;
}

export interface NewsletterSectionData {
	type: "newsletter";
}

export type SectionData =
	| HeroSectionData
	| TestimonialSectionData
	| NewsletterSectionData;

export interface APIResponsePageData extends PageRecord {
	sections: Array<SectionData>;
}

export type PageDataProperties = PageData;

export class PageData implements PageRecord {
	public id: PageRecord["id"];
	public url: PageRecord["url"];
	sections: Array<SectionData>;

	constructor({ id, url, sections }: PageDataProperties) {
		this.id = id;
		this.url = url;
		this.sections = sections;
	}
}
