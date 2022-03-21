import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m } from "framer-motion";
import type { FunctionComponent } from "react";
import { useForm, type UseFormSetError } from "react-hook-form";
import * as z from "zod";

import { IS_DEVELOPMENT } from "$globals";
import type { OrganismComponent } from "$helpers/component";

import { Button } from "$components/atoms";
import { Input } from "$components/molecules";

import CSS from "./NewsletterForm.module.scss";

// @see https://github.com/colinhacks/zod
export type NewsletterFormSchema = z.infer<typeof NEWSLETTER_FORM_SCHEMA>;
const NEWSLETTER_FORM_SCHEMA = z.object({
	email: z
		.string()
		.email({ message: "Invalid email format." })
		.or(z.literal("")),
});

export type NewsletterFormSubmitHandler = (
	data: NewsletterFormSchema,
	/**
	 * @description Set errors for the error handling from the API request response.
	 */
	setError: UseFormSetError<NewsletterFormSchema>,
) => void;

export interface NewsletterFormProperties extends OrganismComponent {
	/**
	 * @description Callback function with the form data in the arguments and
	 * error setter for errors handling.
	 */
	onSubmit: NewsletterFormSubmitHandler;
	/**
	 * @description API response success message.
	 */
	successMessage?: string | undefined;
}

export const NewsletterForm: FunctionComponent<NewsletterFormProperties> = ({
	onSubmit,
	successMessage,
}) => {
	const { control, formState, handleSubmit, register, setError } =
		useForm<NewsletterFormSchema>({
			mode: "all",
			resolver: zodResolver(NEWSLETTER_FORM_SCHEMA),
			reValidateMode: "onChange",
		});

	return (
		<AnimatePresence exitBeforeEnter>
			{formState.isSubmitSuccessful ? (
				<m.span
					key="success"
					className={CSS.success_message}
					animate="enter"
					initial="initial"
					variants={{ enter: { scale: 1 }, initial: { scale: 0 } }}
				>
					{successMessage}
				</m.span>
			) : (
				<m.form
					key="form"
					className={CSS.form}
					onSubmit={handleSubmit((data) => onSubmit(data, setError))}
					transition={{ ease: "anticipate" }}
					exit="exit"
					variants={{ exit: { scale: 0 } }}
					noValidate
				>
					<Input
						className={CSS.input_email}
						{...register("email")}
						disabled={formState.isSubmitting}
						error={formState.errors.email}
						label="Type your email"
						type="email"
					/>

					<Button
						className={CSS.button}
						disabled={formState.isSubmitting || !formState.isValid}
						type="submit"
						label="Submit"
						title="Click to submit signup to the newsletter"
					/>
				</m.form>
			)}

			{IS_DEVELOPMENT && (
				<DevTool control={control} placement="bottom-right" />
			)}
		</AnimatePresence>
	);
};
NewsletterForm.displayName = "NewsletterForm";
NewsletterForm.defaultProps = {};
