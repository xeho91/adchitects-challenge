import { QueryClient } from "react-query";

import { secondsToMilliseconds } from "$helpers/date";

export const API_QUERY_STATUSES = [
	"error",
	"idle",
	"loading",
	"success",
] as const;
export type APIQueryStatus = typeof API_QUERY_STATUSES[number];

const API_BASE_URL = process.env["NEXT_PUBLIC_API_BASE_URL"];

if (!API_BASE_URL) {
	throw new Error(
		"The API basename URL was not set in the environment variables!",
	);
}

export const APIQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			refetchOnMount: true,
			refetchOnReconnect: true,
			useErrorBoundary: true,
		},
	},
});

export const API = {
	baseNameURL: API_BASE_URL,

	routes: {
		//
	},

	settings: {
		intervals: {
			//
		},

		requestTimeout: secondsToMilliseconds(10),

		retries: {
			//
		},

		staleTimes: {
			//
		},
	},
} as const;

/**
 * @description Currently integrated & configured routes from the API in this project.
 */
export type APIRoute = "";
