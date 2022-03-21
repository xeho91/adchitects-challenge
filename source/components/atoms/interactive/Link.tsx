import clsx from "clsx";
// https://nextjs.org/docs/api-reference/next/link
import NextLink from "next/link";
import {
	type FunctionComponent,
	forwardRef,
	type MouseEvent,
	type MouseEventHandler,
} from "react";

import type { AtomComponent } from "$helpers/component";

import CSS from "./Link.module.scss";

export interface InternalLinkProperties
	extends AtomComponent<"disabled" | "title"> {
	as?: string;
	href: string;
	onClick?: MouseEventHandler;
}

const InternalLink: FunctionComponent<InternalLinkProperties> = forwardRef<
	HTMLAnchorElement,
	InternalLinkProperties
>(({ as, children, className, href, disabled, onClick, title }, reference) => {
	function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		if (onClick) {
			onClick(event);
		}
	}

	const classNames = clsx(CSS.link, CSS.internal, className);

	return disabled ? (
		<span className={classNames} aria-disabled="true" title={title}>
			{children}
		</span>
	) : (
		<NextLink as={as ?? href} href={href} shallow={true} passHref>
			{/*
				eslint-disable-next-line
				jsx-a11y/anchor-is-valid,
				jsx-a11y/no-static-element-interactions,
				jsx-a11y/click-events-have-key-events
			*/}
			<a
				ref={reference}
				className={classNames}
				onClick={handleClick}
				title={title}
			>
				{children}
			</a>
		</NextLink>
	);
});
InternalLink.displayName = "InternalLink";
InternalLink.defaultProps = {
	disabled: false,
};

export interface ExternalLinkProperties extends AtomComponent<"title"> {
	href: string;
}

const ExternalLink: FunctionComponent<ExternalLinkProperties> = ({
	children,
	className,
	href,
	title,
}) => {
	return (
		<a
			className={clsx(CSS.link, CSS.external, className)}
			href={href}
			title={title}
		>
			{children}
		</a>
	);
};
ExternalLink.displayName = "ExternalLink";
ExternalLink.defaultProps = {};

export const Link = {
	Internal: InternalLink,
	External: ExternalLink,
};
