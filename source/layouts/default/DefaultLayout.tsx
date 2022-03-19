import { m } from "framer-motion";
import type { FunctionComponent } from "react";

import CSS from "./DefaultLayout.module.scss";

export const DefaultLayout: FunctionComponent = ({ children }) => {
	return (
		<m.div
			className={CSS.default_layout}
			animate="enter"
			exit="exit"
			initial="initial"
			transition={{
				duration: 0.5,
				ease: "anticipate",
			}}
			variants={{
				enter: {
					opacity: 1,
					scale: 1,
					transition: {
						delayChildren: 0.25,
						when: "beforeChildren",
					},
				},
				exit: {
					opacity: 0,
					scale: 2,
					transition: {
						delay: 0.25,
						when: "afterChildren",
					},
				},
				initial: { opacity: 0, scale: 0 },
			}}
		>
			<main className={CSS.main}>{children}</main>
		</m.div>
	);
};
DefaultLayout.displayName = "DefaultLayout";
