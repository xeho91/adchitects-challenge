import { m } from "framer-motion";
import type { FunctionComponent } from "react";

import { useRoute } from "$hooks";

import CSS from "./LoadingPage.module.scss";

export interface LoadingPageProperties {
	/** @default false */
	hidden?: boolean | undefined;
}

export const LoadingPage: FunctionComponent<LoadingPageProperties> = ({
	hidden,
}) => {
	const route = useRoute();

	return (
		<m.article
			className={CSS.page}
			animate={hidden ? "initial" : "enter"}
			exit="exit"
			initial="initial"
			transition={{ duration: 0.5, ease: "anticipate" }}
			variants={{
				enter: {
					opacity: 1,
					scale: 1,
					transition: { delayChildren: 0.1 },
				},
				exit: { opacity: 0, scale: 1.5 },
				initial: { opacity: 0, scale: 0 },
			}}
		>
			<Loader />

			<m.p
				className={CSS.message}
				animate="enter"
				exit="initial"
				initial="initial"
				transition={{ ease: "anticipate" }}
				variants={{
					enter: { fontSize: "1.5em" },
					exit: { fontSize: 0 },
					initial: { fontSize: 0 },
				}}
			>
				{route.loaderMessage}
			</m.p>
		</m.article>
	);
};
LoadingPage.defaultProps = {
	hidden: false,
};
LoadingPage.displayName = "LoadingPage";

const Loader: FunctionComponent = () => (
	<svg
		aria-hidden="true"
		className={CSS.circles}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid"
	>
		<g className={CSS.circles}>
			<circle className={CSS.circle_outer} cx="50" cy="50" r="50" />
			<circle className={CSS.circle_inner} cx="50" cy="20" r="15" />
		</g>
	</svg>
);
