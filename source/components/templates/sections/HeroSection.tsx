import NextImage from "next/image";
import type { FunctionComponent } from "react";

import type { TemplateComponent } from "$helpers/component";
import type { HeroSectionData } from "$utils/PageData";

import { type DefaultSectionProperties, Section } from "$layouts/default";
import { Heading } from "$components/atoms";

import CSS from "./HeroSection.module.scss";

export type HeroSectionProperties = TemplateComponent &
	Omit<HeroSectionData, "type"> &
	DefaultSectionProperties;

export const HeroSection: FunctionComponent<HeroSectionProperties> = ({
	id,
	img,
	text,
}) => {
	return (
		<Section className={CSS.section} id={id}>
			<Heading className={CSS.text} level={1}>
				{text}
			</Heading>
			<HeroImage url={img} />
		</Section>
	);
};
HeroSection.displayName = "HeroSection";
HeroSection.defaultProps = {};

const HeroImage: FunctionComponent<{ url: string }> = ({ url }) => {
	return (
		<figure className={CSS.image}>
			<NextImage
				alt="Hero image"
				src={url}
				width={516}
				height={516}
			/>
		</figure>
	);
};
