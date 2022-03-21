import type { AxiosError } from "axios";
import { useCallback } from "react";
import { type QueryFunction, useQuery } from "react-query";

import { API } from "$globals";
import { getMapFromList } from "$helpers/map";
import { useAPI } from "$hooks";
import { type APIResponsePagesList, PagesList } from "$utils/PagesList";

/**
 * @description React custom hook for every action related to the pages.
 */
export function usePages() {
	const { client, getRouteURL } = useAPI();

	/**
	 * @description API `GET` request for the pages list.
	 */
	const getPagesList: QueryFunction<APIResponsePagesList> = useCallback(
		async ({ signal }) => {
			const options = signal ? { signal } : {};
			const { data } = await client.get(
				getRouteURL(API.routes.pages.list),
				options,
			);

			return data;
		},
		[client, getRouteURL],
	);

	const pagesQuery = useQuery<APIResponsePagesList, AxiosError, PagesList>(
		["pages"],
		getPagesList,
		{
			select: (data) => {
				return new PagesList(getMapFromList(data, "url"));
			},
			retry: API.settings.retries.pages,
			staleTime: API.settings.staleTimes.pages,
		},
	);

	return {
		query: pagesQuery,
	};
}
