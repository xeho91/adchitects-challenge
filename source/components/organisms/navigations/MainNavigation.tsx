import clsx from "clsx";
import { Fragment, type FunctionComponent, useMemo } from "react";

import type { OrganismComponent } from "$helpers/component";
import { isEmptyString } from "$helpers/string";
import { getLabelFromURL } from "$helpers/url";

import { Link } from "$components/atoms";

import CSS from "./MainNavigation.module.scss";

export interface MainNavigationProperties extends OrganismComponent {
	currentLocation: string;
	urls: Array<string>;
}

export const MainNavigation: FunctionComponent<MainNavigationProperties> = ({
	className,
	currentLocation,
	urls,
}) => {
	const urlsMap = useMemo(() => {
		return new Map(urls.map((url) => [url, getLabelFromURL(url)]));
	}, [urls]);

	return (
		<nav className={clsx(CSS.nav, className)}>
			<ul>
				{[...urlsMap].map(([url, label]) => (
					<Fragment key={url}>
						{!isEmptyString(label) && (
							<li
								aria-current={
									url === currentLocation ? "page" : undefined
								}
							>
								<NavigationLink
									isCurrentPage={url === currentLocation}
									label={label}
									href={url}
								/>
							</li>
						)}
					</Fragment>
				))}
			</ul>
		</nav>
	);
};
MainNavigation.displayName = "MainNavigation";
MainNavigation.defaultProps = {};

interface NavigationLinkProperties {
	disabled?: boolean;
	isCurrentPage: boolean;
	label: string;
	href: string;
}

const NavigationLink: FunctionComponent<NavigationLinkProperties> = ({
	disabled,
	label,
	href,
	isCurrentPage,
}) => {
	return isCurrentPage ? (
		<span className={CSS.link}>{label}</span>
	) : (
		<Link.Internal
			className={CSS.link}
			disabled={disabled}
			href={href}
			title={`Go to ${label} page`}
		>
			{label}
		</Link.Internal>
	);
};
