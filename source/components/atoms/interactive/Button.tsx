import clsx from "clsx";
import type {
	ButtonHTMLAttributes,
	FunctionComponent,
	MouseEventHandler,
} from "react";

import type { AtomComponent } from "$helpers/component";

import CSS from "./Button.module.scss";

export interface ButtonProperties
	extends AtomComponent<"disabled" | "label" | "title"> {
	/**
	 * @description Callback function action to run when Button element was clicked.
	 */
	onClick?: MouseEventHandler<HTMLButtonElement>;
	/**
	 * @description HTML type of the button element.
	 * @default "button"
	 */
	type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const Button: FunctionComponent<ButtonProperties> = ({
	className,
	disabled,
	label,
	onClick,
	title,
	type,
}) => {
	return (
		<button
			className={clsx(CSS.button, className)}
			aria-label={title}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{label && <span className={CSS.label}>{label}</span>}
		</button>
	);
};
Button.displayName = "Button";
Button.defaultProps = {
	disabled: false,
	type: "button",
};
