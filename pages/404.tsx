import { useRouter } from "next/router";

import { APIError, API_ERRORS_MAP } from "$utils/APIError";
import { ErrorPage } from "$components/pages";
import type { RouteComponent } from "$pages/_app";

const FourOhFour: RouteComponent = () => {
	const error = API_ERRORS_MAP.get(404);
	const router = useRouter();

	return error ? (
		<ErrorPage
			error={new APIError(error)}
			resetErrorBoundary={() => router.push("/")}
		/>
	) : null; // eslint-disable-line unicorn/no-null
};
FourOhFour.layout = "default";

export default FourOhFour;
