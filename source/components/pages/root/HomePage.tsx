import dynamic from "next/dynamic";
import {
	type ComponentType,
	Fragment,
	type FunctionComponent,
	useEffect,
} from "react";

import { APP } from "$globals";
import { usePageData, useRoute } from "$hooks";
import type { SectionData } from "$utils/PageData";

import { Article } from "$layouts/default";
import type {
	HeroSectionProperties,
	NewsletterSectionProperties,
	TestimonialSectionProperties,
} from "$components/templates";

import CSS from "./HomePage.module.scss";

export const HomePage: FunctionComponent = () => {
	const pageData = usePageData();
	const route = useRoute();

	useEffect(() => {
		const title = APP.routes.home.getTitle();

		if (route.title !== title) {
			route.setTitle(title);
		}
	}, [route]);

	return (
		<Article className={CSS.article} isReady={pageData.isReady}>
			<Article.Sections>
				{pageData.query.data?.sections.map((data, index) => (
					<Fragment key={`${data.type}-${index}`}>
						<Section id={`${data.type}-${index}`} data={data} />
					</Fragment>
				))}
			</Article.Sections>
		</Article>
	);
};
HomePage.displayName = "LoginPage";

const HeroSection: ComponentType<HeroSectionProperties> = dynamic(
	() => import("$components/templates").then((_) => _.HeroSection),
	{ ssr: false },
);

const NewsletterSection: ComponentType<NewsletterSectionProperties> = dynamic(
	() => import("$components/templates").then((_) => _.NewsletterSection),
	{ ssr: false },
);

const TestimonialSection: ComponentType<TestimonialSectionProperties> = dynamic(
	() => import("$components/templates").then((_) => _.TestimonialSection),
	{ ssr: false },
);

const Section: FunctionComponent<{ id: string; data: SectionData }> = ({
	data,
	id,
}) => {
	switch (data.type) {
		case "hero": {
			return <HeroSection id={id} {...data} />;
		}

		case "newsletter": {
			return <NewsletterSection id={id} {...data} />;
		}

		case "testimonial": {
			return <TestimonialSection id={id} {...data} />;
		}
	}
};
