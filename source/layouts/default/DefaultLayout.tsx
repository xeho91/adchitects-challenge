import { m } from "framer-motion";
import type { FunctionComponent } from "react";

import { Header } from "$layouts/default";
import { usePages } from "$hooks";

import CSS from "./DefaultLayout.module.scss";

export const DefaultLayout: FunctionComponent = ({ children }) => {
	const pages = usePages();

	return (
		<m.div
			className={CSS.layout}
			animate="enter"
			exit="exit"
			initial="initial"
			transition={{ duration: 0.5, ease: "anticipate" }}
			variants={{
				enter: { opacity: 1 },
				exit: { opacity: 0 },
				initial: { opacity: 0 },
			}}
		>
			<Header
				className={CSS.header}
				hidden={!pages.query.isSuccess}
				urls={pages.query.data?.urls}
			/>

			<main className={CSS.main}>{children}</main>
		</m.div>
	);
};
DefaultLayout.displayName = "DefaultLayout";
