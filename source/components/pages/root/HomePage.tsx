import type { FunctionComponent } from "react";

import { APP } from "$globals";

import { Article, Section } from "$layouts/default";
import { Heading } from "$components/atoms";

import CSS from "./HomePage.module.scss";

export const HomePage: FunctionComponent = () => {
	return (
		<Article className={CSS.home_page}>
			<Article.Header>
				<Heading className={CSS.title} level={1}>
					{APP.routes.home.getHeading()} {APP.name}
				</Heading>
			</Article.Header>

			<Article.Sections>
				<Section>Section content</Section>
			</Article.Sections>
		</Article>
	);
};
HomePage.displayName = "LoginPage";
