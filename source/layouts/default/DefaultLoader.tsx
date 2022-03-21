import clsx from "clsx";
import { m } from "framer-motion";
import type { FunctionComponent } from "react";

import type { TemplateComponent } from "$helpers/component";

import CSS from "./DefaultLoader.module.scss";

export interface DefaultLoaderProperties extends TemplateComponent {
	/** @default false */
	hidden?: boolean | undefined;
}

export const DefaultLoader: FunctionComponent<DefaultLoaderProperties> = ({
	className,
	hidden,
}) => {
	const circleRadius = 50;
	const circles = [
		{ name: "circle_one", begin: 0 },
		{ name: "circle_two", begin: 0.5 },
	] as const;

	return (
		<m.div
			key="dashboard-loader"
			className={clsx(CSS.container, className)}
			animate={hidden ? "exit" : "enter"}
			exit="exit"
			initial="initial"
			transition={{ ease: "anticipate" }}
			variants={{
				enter: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 0.5 },
				initial: { opacity: 0.5, scale: 1.5 },
			}}
		>
			<svg
				className={CSS.loader}
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`0 0 ${circleRadius * 2} ${circleRadius * 2}`}
				preserveAspectRatio="xMidYMid"
			>
				{circles.map((circle) => (
					<circle
						key={circle.name}
						className={CSS[circle.name]}
						cx={circleRadius}
						cy={circleRadius}
						r="0"
					>
						<animate
							attributeName="r"
							repeatCount="indefinite"
							dur="1s"
							values="0;40"
							keyTimes="0;1"
							keySplines="0 0.2 0.8 1"
							calcMode="spline"
							begin={`${circle.begin}s`}
						/>
						<animate
							attributeName="opacity"
							repeatCount="indefinite"
							dur="1s"
							values="1;0"
							keyTimes="0;1"
							keySplines="0.2 0 0.8 1"
							calcMode="spline"
							begin={`${circle.begin}s`}
						/>
					</circle>
				))}
			</svg>

			<p className={CSS.message}>
				Please wait, the content is loading...
			</p>
		</m.div>
	);
};
DefaultLoader.displayName = "DefaultLoader";
DefaultLoader.defaultProps = {
	hidden: false,
};
