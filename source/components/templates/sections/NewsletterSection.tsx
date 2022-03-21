import { FunctionComponent, useMemo } from "react";

import type { TemplateComponent } from "$helpers/component";
import type { NewsletterSectionData } from "$utils/PageData";

import { type DefaultSectionProperties, Section } from "$layouts/default";
import {
	APIResponseNewsletterSubscribe,
	useNewsletter,
} from "$hooks/useNewsletter";

import { Heading } from "$components/atoms";
import {
	NewsletterForm,
	type NewsletterFormSubmitHandler,
} from "$components/organisms";

import CSS from "./NewsletterSection.module.scss";

export type NewsletterSectionProperties = TemplateComponent &
	Omit<NewsletterSectionData, "type"> &
	DefaultSectionProperties;

export const NewsletterSection: FunctionComponent<
	NewsletterSectionProperties
> = ({ id }) => {
	const newsletter = useNewsletter();
	const successMessage = useMemo(() => {
		if (newsletter.subscribe.isSuccess) {
			return newsletter.subscribe.data.message;
		}
	}, [newsletter.subscribe]);

	const handleSubmit: NewsletterFormSubmitHandler = async (
		data,
		setError,
	) => {
		try {
			await newsletter.subscribe.mutateAsync(data);
		} catch (error) {
			setError("email", {
				message: error as APIResponseNewsletterSubscribe["message"],
			});
		}
	};

	return (
		<Section id={id} className={CSS.section}>
			<Heading className={CSS.title} level={2}>
				{"Sign up for Newsletter"}
			</Heading>
			<NewsletterForm
				onSubmit={handleSubmit}
				successMessage={successMessage}
			/>
		</Section>
	);
};
NewsletterSection.displayName = "NewsletterSection";
NewsletterSection.defaultProps = {};
