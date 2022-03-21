import type { AxiosError } from "axios";
import { useCallback } from "react";
import { type MutationFunction, useMutation } from "react-query";

import { API } from "$globals";
import { useAPI } from "$hooks";

import type { NewsletterFormSchema } from "$components/organisms";

export interface APIResponseNewsletterSubscribe {
	message: string;
}

/**
 * @description React custom hook for every action related to the newsletter.
 */
export function useNewsletter() {
	const { client, getRouteURL } = useAPI();

	const postSubscribtion: MutationFunction<
		APIResponseNewsletterSubscribe,
		NewsletterFormSchema
	> = useCallback(
		async (newSubscription) => {
			const { data } = await client.post(
				getRouteURL(API.routes.newsletter.subscribe),
				newSubscription,
			);

			return data;
		},
		[client, getRouteURL],
	);

	const subscribeQuery = useMutation<
		APIResponseNewsletterSubscribe,
		AxiosError,
		NewsletterFormSchema
	>(postSubscribtion, {
		useErrorBoundary: (error) => error.response?.status !== 400,
		onError: (error) => {
			throw error.response?.data?.message;
		},
	});

	return {
		subscribe: subscribeQuery,
	};
}
