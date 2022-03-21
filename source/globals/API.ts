import { QueryClient } from "react-query";

import { minutesToMilliseconds, secondsToMilliseconds } from "$helpers/date";

export const API_QUERY_STATUSES = [
	"error",
	"idle",
	"loading",
	"success",
] as const;
export type APIQueryStatus = typeof API_QUERY_STATUSES[number];

const API_BASE_URL = process.env["NEXT_PUBLIC_API_BASE_URL"];
const API_CREDENTIALS = Buffer.from(
	`${process.env["NEXT_PUBLIC_API_USERNAME"]}:${process.env["NEXT_PUBLIC_API_PASSWORD"]}`,
	"binary",
).toString("base64");

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
	credentials: API_CREDENTIALS,

	routes: {
		newsletter: {
			subscribe: "/newsletter",
		},

		pages: {
			list: "/pages",
		},

		page: (id: string) => ({
			data: `/page/${id}`,
		}),
	},

	settings: {
		intervals: {
			//
		},

		requestTimeout: secondsToMilliseconds(5),

		retries: {
			pages: 3,
			page: 3,
		},

		staleTimes: {
			pages: minutesToMilliseconds(30),
			page: minutesToMilliseconds(30),
		},
	},
} as const;

/**
 * @description Currently integrated & configured routes from the API in this project.
 * TODO: Type safe them
 */
export type APIRoute = string;
