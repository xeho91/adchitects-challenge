import type { AxiosError } from "axios";
import { useCallback, useMemo } from "react";
import { type QueryFunction, useQuery } from "react-query";

import { API } from "$globals";
import { useAPI, usePages } from "$hooks";
import { PageData } from "$utils/PageData";
import type { APIResponsePageData } from "$utils/PageData";
import { useRouter } from "next/router";

/**
 * @description React custom hook for every action related to the page data.
 */
export function usePageData() {
	const { client, getRouteURL } = useAPI();
	const pages = usePages();
	const router = useRouter();
	const pageId = useMemo(() => {
		return pages.query.data?.map.get(router.pathname)?.id ?? "";
	}, [pages.query.data, router.pathname]);
	const hasId = useMemo(() => Boolean(pageId), [pageId]);

	/**
	 * @description API `GET` request
	 */
	const getPageData: QueryFunction<APIResponsePageData> = useCallback(
		async ({ signal }) => {
			const options = signal ? { signal } : {};
			const { data } = await client.get(
				getRouteURL(API.routes.page(pageId).data),
				options,
			);

			return data;
		},
		[client, getRouteURL, pageId],
	);

	const pageDataQuery = useQuery<APIResponsePageData, AxiosError, PageData>(
		["page data", pageId],
		getPageData,
		{
			enabled: hasId,
			select: (data) => {
				return new PageData(data);
			},
			retry: API.settings.retries.page,
			staleTime: API.settings.staleTimes.page,
		},
	);

	return {
		query: pageDataQuery,
		isReady: hasId && pageDataQuery.isSuccess,
	};
}
