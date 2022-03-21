import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import {
	type ComponentType,
	Fragment,
	type FunctionComponent,
	useEffect,
	useMemo,
	useState,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { APIQueryClient, APP, IS_DEVELOPMENT } from "$globals";
import { usePages, useRoute } from "$hooks";

import { type ErrorPageProperties, LoadingPage } from "$components/pages";

import "$scripts/stop-runaway-effects";
import "$scripts/why-did-you-render";

import "$styles/main.scss";

const DefaultLayout: ComponentType = dynamic(
	() => import("$layouts/default").then((_) => _.DefaultLayout),
	{ ssr: false },
);

/**
 * @description Available layouts for this app project.
 * @see https://nextjs.org/docs/basic-features/layouts
 */
export const APP_LAYOUTS = {
	default: DefaultLayout,
} as const;
export type AppLayout = keyof typeof APP_LAYOUTS;

const ErrorPage: ComponentType<ErrorPageProperties> = dynamic(
	() => import("$components/pages").then((_) => _.ErrorPage),
	{ ssr: false },
);

/**
 * @description This layout pattern enables state persistence because the React
 * component tree is maintained between page transitions. With the component
 * tree, React can understand which elements have changed to preserve state.
 */
type AppPropertiesWithLayout = AppProps & CustomAppProperties;

/**
 * @description Additional properties which can be defined in each **Route**
 * Component.
 */
interface CustomRouteProperties {
	layout: AppLayout;
}

/**
 * @description Next.JS Per-Page Layout.
 * @see https://nextjs.org/docs/basic-features/layouts#per-page-layouts
 */
export type RouteComponent = NextPage & CustomRouteProperties;

/**
 * @description Overriding Next.JS `CustomApp` Properties.
 * @see https://nextjs.org/docs/basic-features/layouts#with-typescript
 */
interface CustomAppProperties {
	Component: RouteComponent;
}

/**
 * @description Next.JS custom `App`.
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
const CustomApp: FunctionComponent<AppPropertiesWithLayout> = (properties) => {
	const [isMounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const route = useRoute();

	return (
		<Fragment>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
				/>
				<title>
					{APP.name} {route.title ? `| ${route.title}` : ""}
				</title>
			</Head>

			<LazyMotion features={domAnimation} strict>
				{/* @ts-ignore Properties for thie fallback component are being extended. */}
				<ErrorBoundary FallbackComponent={ErrorPage}>
					<QueryClientProvider
						client={APIQueryClient}
						contextSharing={true}
					>
						{IS_DEVELOPMENT && (
							<ReactQueryDevtools initialIsOpen={true} />
						)}

						{isMounted && <AppContent {...properties} />}
					</QueryClientProvider>
				</ErrorBoundary>
			</LazyMotion>
		</Fragment>
	);
};
CustomApp.displayName = "CustomApp";

export default CustomApp;

const AppContent: FunctionComponent<AppPropertiesWithLayout> = ({
	Component: Route,
	pageProps: routerProperties,
	router,
}) => {
	const layout = useMemo(() => Route.layout || "default", [Route.layout]);
	const LayoutComponent = APP_LAYOUTS[layout];
	const pages = usePages();
	const route = useRoute();

	useEffect(() => {
		if (!route.isReady && pages.query.isSuccess && router.isReady) {
			route.setIsReady(true);
		}
	}, [pages.query.isSuccess, route, router.isReady]);

	return (
		<AnimatePresence exitBeforeEnter>
			{!route.isReady ? (
				<LoadingPage key="loader-page" />
			) : (
				<LayoutComponent key={`${layout}-layout`}>
					<Route {...routerProperties} />
				</LayoutComponent>
			)}
		</AnimatePresence>
	);
};
AppContent.displayName = "AppContent";
