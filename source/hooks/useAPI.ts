import axios from "axios";
import { useCallback } from "react";
import { useErrorHandler } from "react-error-boundary";
import { createTrackedSelector } from "react-tracked";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { API, APIQueryStatus, APIRoute } from "$globals";
import { APIError, APIErrorProperties, API_ERRORS_MAP } from "$utils/APIError";

interface APIQueryStatusState {
	status: APIQueryStatus;
	update: (status: APIQueryStatusState["status"]) => void;
}

const queryStatusStore = create<APIQueryStatusState>(
	devtools(
		(set) => ({
			status: "success",
			update: (status) => set({ status }),
		}),
		{ name: "API query status store" },
	),
);

/**
 * @description React custom hook function for a quick usage of the API client routes.
 */
export function useAPI() {
	const queryStatus = createTrackedSelector(queryStatusStore)();
	const errorHandler = useErrorHandler();
	const client = axios.create({
		baseURL: API.baseNameURL,
		timeout: API.settings.requestTimeout,
		headers: {
			"Access-Control-Allow-Origin": API.baseNameURL,
		},
	});

	// Use React Error Boundary to handle no connection with the API
	client.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.message === "Network Error") {
				errorHandler(
					new APIError(API_ERRORS_MAP.get(500) as APIErrorProperties),
				);
			} else {
				throw error;
			}
		},
	);

	/**
	 * @description Queries which can be added to the API route URL.
	 */
	type APIRouteURLQueries = string[][] | Record<string, string>;

	/**
	 * @description Set API route URL based on the proviced route and queries.
	 */
	const getRouteURL = useCallback(
		(route: APIRoute, queries?: APIRouteURLQueries) => {
			if (!route) {
				throw new Error(`Target route was not specified!`);
			} else {
				const url = new URL(`${API.baseNameURL}${route}`);

				if (queries) {
					url.search = new URLSearchParams(queries).toString();
				}

				return url.toString();
			}
		},
		[],
	);

	return {
		client,
		getRouteURL,
		queryStatus: queryStatus.status,
		updateQueryStatus: queryStatus.update,
	};
}
