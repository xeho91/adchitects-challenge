import clsx from "clsx";
import emailRegexSafe from "email-regex-safe";
import { AnimatePresence, m } from "framer-motion";
import {
	type ChangeEventHandler,
	type FocusEventHandler,
	forwardRef,
	type FunctionComponent,
} from "react";
import type { FieldError } from "react-hook-form";

import type { AtomComponent } from "$helpers/component";

import CSS from "./Input.module.scss";

type InputType = "email" | "name" | "number" | "password" | "tel" | "text";

interface InputSharedProperties extends AtomComponent<"disabled" | "label"> {
	error?: FieldError | undefined;
	/**
	 * @description Input field name, should be in `kebab_case`.
	 */
	name: string;
	/**
	 * @description Callback function to run, when focus on the input is gone.
	 */
	onBlur?: FocusEventHandler<HTMLInputElement>;
	/**
	 * @description Callback function to run, when typing a value to the input.
	 */
	onChange: ChangeEventHandler<HTMLInputElement>;
	/**
	 * @description Callback function to run, when there's focus on the input.
	 */
	onFocus?: ChangeEventHandler<HTMLInputElement>;
	/**
	 * @description Is this input component required to be filled?
	 * @default false
	 */
	required?: boolean | undefined;
}

interface InputTextProperties {
	defaultValue?: string | undefined;
	type: Exclude<InputType, "number" | "tel">;
	value?: string | undefined;
}

export type InputProperties = InputSharedProperties & InputTextProperties;

export const Input = forwardRef<HTMLInputElement, InputProperties>(
	(
		{
			className,
			defaultValue,
			disabled,
			error,
			label,
			name,
			onBlur,
			onChange,
			onFocus,
			required,
			type,
			value,
		},
		outerReference,
	) => {
		const id = `input-${type}-${name}`;

		return (
			<div className={clsx(CSS.wrapper, className)}>
				<input
					ref={outerReference}
					className={CSS.input}
					defaultValue={defaultValue}
					disabled={disabled}
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					onFocus={onFocus}
					pattern={getInputPattern(type)}
					placeholder={`Insert ${type} here`}
					required={required}
					type={type}
					value={value}
				/>

				{label && (
					<label className={CSS.label} htmlFor={id}>
						{label}
					</label>
				)}

				<ErrorFeedback error={error} />
			</div>
		);
	},
);
Input.displayName = "Input";
Input.defaultProps = {
	disabled: false,
	required: false,
};

const ErrorFeedback: FunctionComponent<{ error: FieldError | undefined }> = ({
	error,
}) => (
	<AnimatePresence exitBeforeEnter>
		{error && (
			<m.div
				className={CSS.error}
				animate="visible"
				exit="hidden"
				initial="hidden"
				variants={{
					hidden: { opacity: 0, scale: 0 },
					visible: { opacity: 1, scale: 1 },
				}}
			>
				<p className={CSS.error_message}>{error.message}</p>
			</m.div>
		)}
	</AnimatePresence>
);

function getInputPattern(type: InputType) {
	switch (type) {
		case "email": {
			return emailRegexSafe({
				strict: true,
				utf8: true,
				localhost: false,
				returnString: true,
			});
		}
		case "name":
			return "[a-z][A-Z]";
		case "text":
			return ".*";
		default:
			throw new Error(`Unrecognized input type: "${type}"!`);
	}
}
