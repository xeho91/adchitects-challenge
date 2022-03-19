import { AnimatePresence, m } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect } from "react";
import type { FunctionComponent } from "react";
import type { FallbackProps } from "react-error-boundary";

import { Button, Heading, Logo } from "$components/atoms";

import { APIError } from "$utils/APIError";
import { usePage } from "$hooks";

import CSS from "./ErrorPage.module.scss";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type ErrorPageProperties = FallbackProps & {
	/** @default false */
	hidden?: boolean;
	error: APIError;
};

export const ErrorPage: FunctionComponent<ErrorPageProperties> = ({
	hidden,
	error,
	resetErrorBoundary,
}) => {
	const page = usePage();

	useEffect(() => {
		if (error instanceof APIError) {
			page.setTitle(`${error?.code} error`);
		}
	}, [error, page]);

	if (error instanceof APIError) {
		return (
			<AnimatePresence exitBeforeEnter>
				<m.main
					className={CSS.error_page}
					animate={hidden ? "exit" : "enter"}
					exit="exit"
					initial="initial"
					variants={{
						enter: { opacity: 1, scale: 1 },
						exit: { opacity: 0, scale: 0.5 },
						initial: { opacity: 0.5, scale: 1.5 },
					}}
				>
					<Header />
					<Content {...error} reset={resetErrorBoundary} />
				</m.main>
			</AnimatePresence>
		);
	} else {
		console.error(error);
		return <Fragment />;
	}
};
ErrorPage.displayName = "ErrorPage";
ErrorPage.defaultProps = {
	hidden: false,
};

const Header: FunctionComponent = () => (
	<header className={CSS.header}>
		<Logo className={CSS.logo} />
	</header>
);

const Content: FunctionComponent<
	APIError & { reset: FallbackProps["resetErrorBoundary"] }
> = ({ code, description, message, name, reset }) => {
	const router = useRouter();

	const handleButtonClick = useCallback(() => {
		if (reset) {
			reset();
		} else {
			router.push("/");
		}
	}, [reset, router]);
	return (
		<section className={CSS.content}>
			<Heading className={CSS.title} level={1}>
				<span className={CSS.title_prefix}>Error {code}</span>
				{" - "}
				<span className={CSS.title_text}>{name}</span>
			</Heading>

			<p className={CSS.message}>{message}</p>

			<p className={CSS.description}>
				<span className={CSS.description_prefix}>Description:</span>{" "}
				<span className={CSS.description_text}>{description}</span>
			</p>

			<Button
				className={CSS.button}
				label="Return to previous state"
				title="Click to return to the previous state"
				onClick={handleButtonClick}
			/>
		</section>
	);
};
