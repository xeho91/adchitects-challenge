import clsx from "clsx";
import { m } from "framer-motion";
import type { FunctionComponent } from "react";

import type { LayoutComponent } from "$helpers/component";

import { DefaultLoader } from "$layouts/default";

import CSS from "./DefaultArticle.module.scss";

const SectionsWrapper: FunctionComponent<LayoutComponent> = ({
	children,
	className,
}) => {
	return (
		<div className={clsx(CSS.sections_wrapper, className)}>{children}</div>
	);
};
SectionsWrapper.defaultProps = {};
SectionsWrapper.displayName = "DashboardArticleSectionsWrapper";

interface DefaultArticleProperties extends LayoutComponent {
	isReady?: boolean;
}

interface DefaultArticleCompoundComponents {
	Sections: typeof SectionsWrapper;
}

export const Article: FunctionComponent<DefaultArticleProperties> &
	DefaultArticleCompoundComponents = ({ children, className, isReady }) => {
	return isReady ? (
		<m.article
			className={clsx(CSS.article, className)}
			animate="enter"
			exit="exit"
			initial="exit"
			transition={{ duration: 0.5, ease: "anticipate" }}
			variants={{
				enter: { opacity: 1 },
				exit: { opacity: 0 },
				initial: { opacity: 0 },
			}}
		>
			{children}
		</m.article>
	) : (
		<DefaultLoader />
	);
};
Article.defaultProps = {};
Article.displayName = "DefaultArticle";
Article.Sections = SectionsWrapper;
