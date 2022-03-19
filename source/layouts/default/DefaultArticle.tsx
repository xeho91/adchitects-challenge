import clsx from "clsx";
import { m } from "framer-motion";
import type { FunctionComponent } from "react";

import type { LayoutComponent } from "$helpers/component";

import { Heading } from "$components/atoms";

import CSS from "./DefaultArticle.module.scss";

interface DefaultArticleHeaderProperties extends LayoutComponent {
	title?: string | JSX.Element | undefined;
}

const Header: FunctionComponent<DefaultArticleHeaderProperties> = ({
	children,
	className,
	title,
}) => (
	<header className={clsx(CSS.header, className)}>
		{title && (
			<Heading className={clsx(CSS.title, "title")} level={1}>
				{title}
			</Heading>
		)}

		{children}
	</header>
);

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

interface DefaultArticleCompoundComponents {
	Header: typeof Header;
	Sections: typeof SectionsWrapper;
}

export const Article: FunctionComponent<LayoutComponent> &
	DefaultArticleCompoundComponents = ({ children, className }) => {
	return (
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
	);
};
Article.defaultProps = {};
Article.displayName = "DefaultArticle";
Article.Header = Header;
Article.Sections = SectionsWrapper;
