import clsx from "clsx";
import { m } from "framer-motion";
import type { FunctionComponent } from "react";

import type { LayoutComponent } from "$helpers/component";

import CSS from "./DefaultSection.module.scss";

export const Section: FunctionComponent<LayoutComponent> = ({
	className,
	children,
}) => (
	<m.section
		className={clsx(CSS.section, className)}
		initial="hidden"
		transition={{ delay: 0.1 }}
		variants={{
			hidden: { scale: 0.75 },
			visible: { scale: 1 },
		}}
		viewport={{ once: true }}
		whileInView="visible"
	>
		{children}
	</m.section>
);
Section.defaultProps = {};
Section.displayName = "DashboardSection";
