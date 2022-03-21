import { Fragment, FunctionComponent, useEffect } from "react";

import { APP } from "$globals";
import { usePageData, useRoute } from "$hooks";

import { Article } from "$layouts/default";

import CSS from "./HomePage.module.scss";
import {
	HeroSection,
	NewsletterSection,
	TestimonialSection,
} from "$components/templates";
import type { SectionData } from "$utils/PageData";

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
