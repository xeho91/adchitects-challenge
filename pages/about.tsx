import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import { APP } from "$globals";
import type { RouteComponent } from "$pages/_app";

const HomePage: ComponentType = dynamic(
	() => import("$components/pages").then((_) => _.HomePage),
	{ ssr: false },
);

/**
 * @description `/about`
 */
const AboutRoute: RouteComponent = () => {
	return <HomePage />;
};
AboutRoute.displayName = "AboutRoute";
AboutRoute.layout = APP.routes.home.layout;

export default AboutRoute;
