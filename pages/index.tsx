import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import { APP } from "$globals";
import type { RouteComponent } from "$pages/_app";

const HomePage: ComponentType = dynamic(
	() => import("$components/pages").then((_) => _.HomePage),
	{ ssr: false },
);

/**
 * @description `/` or `/index`
 */
const IndexRoute: RouteComponent = () => {
	return <HomePage />;
};
IndexRoute.displayName = "IndexRoute";
IndexRoute.layout = APP.routes.home.layout;

export default IndexRoute;
