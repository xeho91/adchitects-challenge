import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import { APP } from "$globals";
import type { RouteComponent } from "$pages/_app";

const HomePage: ComponentType = dynamic(
	() => import("$components/pages").then((_) => _.HomePage),
	{ ssr: false },
);

/**
 * @description `/solutions`
 */
const SolutionsRoute: RouteComponent = () => {
	return <HomePage />;
};
SolutionsRoute.displayName = "SolutionsRoute";
SolutionsRoute.layout = APP.routes.home.layout;

export default SolutionsRoute;
