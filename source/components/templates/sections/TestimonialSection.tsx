import type { FunctionComponent } from "react";

import type { TemplateComponent } from "$helpers/component";
import type { TestimonialSectionData } from "$utils/PageData";

import { type DefaultSectionProperties, Section } from "$layouts/default";
import { Quote } from "$components/atoms";

import CSS from "./TestimonialSection.module.scss";

export type TestimonialSectionProperties = TemplateComponent &
	Omit<TestimonialSectionData, "type"> &
	DefaultSectionProperties;

export const TestimonialSection: FunctionComponent<
	TestimonialSectionProperties
> = ({ author, id, text }) => {
	return (
		<Section id={id} className={CSS.section}>
			<Quote className={CSS.quote} author={author} text={text} />
		</Section>
	);
};
TestimonialSection.displayName = "TestimonialSection";
TestimonialSection.defaultProps = {};
