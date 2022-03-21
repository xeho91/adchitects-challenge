interface SharedProperties {
	/**
	 * @description Additional CSS class name **to be passed from the parent
	 * component**.
	 */
	className?: string;
	/**
	 * @description Set component's state: **disabled**.
	 * @default false
	 */
	disabled?: boolean | undefined;
	/**
	 * @description Label text for the component.
	 */
	label?: string;
	/**
	 * @description **Descriptive** action explanation for the interactive
	 * component _(displays on hover)_.
	 */
	title: string;
}

export type AtomComponent<T extends keyof SharedProperties = never> = Pick<
	SharedProperties,
	"className" | T
>;

export type MoleculeComponent<T extends keyof SharedProperties = never> = Pick<
	SharedProperties,
	"className" | T
>;

export type OrganismComponent<T extends keyof SharedProperties = never> = Pick<
	SharedProperties,
	"className" | T
>;

export type TemplateComponent<T extends keyof SharedProperties = never> = Pick<
	SharedProperties,
	"className" | T
>;

export type LayoutComponent<T extends keyof SharedProperties = never> = Pick<
	SharedProperties,
	"className" | T
>;
