import clsx from "clsx";
import { m } from "framer-motion";
import { useRouter } from "next/router";
import type { FunctionComponent } from "react";

import type { LayoutComponent } from "$helpers/component";

import { Button, Logo } from "$components/atoms";
import { MainNavigation } from "$components/organisms";

import CSS from "./DefaultHeader.module.scss";

export interface DefaultHeaderProperties extends LayoutComponent {
	/** @default false */
	hidden?: boolean | undefined;
	urls?: Array<string> | undefined;
}

export const Header: FunctionComponent<DefaultHeaderProperties> = ({
	className,
	hidden,
	urls,
}) => {
	const router = useRouter();

	return (
		<m.header
			className={clsx(CSS.header, className)}
			animate={hidden ? "hidden" : "visible"}
			initial="hidden"
			transition={{ delay: 0.5, ease: "anticipate" }}
			variants={{
				hidden: { y: "-100%" },
				visible: { y: 0 },
			}}
		>
			<Logo className={CSS.logo} />

			{urls && (
				<MainNavigation currentLocation={router.asPath} urls={urls} />
			)}

			<Button
				className={CSS.button}
				label="Contact us"
				title="Click to scroll to the contact section"
			/>
		</m.header>
	);
};
Header.displayName = "DefaultHeader";
Header.defaultProps = {
	hidden: false,
};
