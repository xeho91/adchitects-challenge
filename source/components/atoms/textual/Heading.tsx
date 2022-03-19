import clsx from "clsx";
import type { FunctionComponent } from "react";

import type { AtomComponent } from "$helpers/component";

import CSS from "./Heading.module.scss";

export interface HeadingProperties extends AtomComponent {
	level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading: FunctionComponent<HeadingProperties> = ({
	className,
	children,
	level,
}) => {
	const HeadingTag = `h${level}` as const;

	return (
		<HeadingTag
			className={clsx(CSS.heading, CSS[`level${level}`], className)}
		>
			<span className={clsx(CSS.content)}>{children}</span>
		</HeadingTag>
	);
};
Heading.displayName = "Heading";
Heading.defaultProps = {};
