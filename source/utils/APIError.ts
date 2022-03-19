import { API } from "$globals";

/**
 * @description Currently available and defined API Errors for this APP project.
 */
export const API_ERROR_CODES = [400, 401, 403, 404, 500, 502, 504] as const;

export type APIErrorCode = typeof API_ERROR_CODES[number];
export type APIErrorProperties = Pick<
	APIError,
	"code" | "message" | "description"
> &
	Error;

export class APIError extends Error {
	public code: APIErrorCode;
	public data: unknown;
	public description: string;

	constructor({ code, description, message, name }: APIErrorProperties) {
		super(message);

		this.code = code;
		this.description = description;
		this.name = name;
	}
}

export const API_ERRORS_MAP = new Map<APIErrorCode, APIErrorProperties>();

API_ERRORS_MAP.set(400, {
	code: 400,
	description: "The requested feature is not enabled in this environment.",
	message: "Your browser sent a bad request.",
	name: "Bad request",
});

API_ERRORS_MAP.set(401, {
	code: 401,
	description:
		"The request did not include an authentication token or the authentication token was expired.",
	message: "You don't have access to this content.",
	name: "Unauthorized Access",
});

API_ERRORS_MAP.set(403, {
	code: 403,
	description:
		"The feature you are trying to access is not accessible. Please contact your administrator.",
	message: "You do not have permission to access the requested resource.",
	name: "Restricted Access",
});

API_ERRORS_MAP.set(404, {
	code: 404,
	description:
		"We may have removed the page when we redesigned the website or the link you clicked is too old and does not work anymore.",
	message: "Oops! The content you are looking for can’t be found. ",
	name: "Not Found",
});

API_ERRORS_MAP.set(500, {
	code: 500,

	name: "Internal Error",
	message: "An unexpected server error occurred.",
	description:
		"We may have encountered a server issue. We are working on it. You may try again in a moment.",
});

API_ERRORS_MAP.set(502, {
	code: 502,
	description:
		"The server encounter an error and could not complete your request. You may try again in a moment.",
	message: "An unexpected server error occurred.",
	name: "Bad Gateway",
});

API_ERRORS_MAP.set(504, {
	code: 504,
	description: `The server could not complete your request on time (within ${
		API.settings.requestTimeout / 1000
	} seconds). You may try again in a moment.`,
	message: "The API server couldn't respond on time.",
	name: "Gateway Timeout",
});
