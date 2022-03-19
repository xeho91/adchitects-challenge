export const IS_BROWSER = typeof window !== "undefined";
export const IS_DEVELOPMENT = process.env["NODE_ENV"] === "development";
export const IS_PRODUCTION = process.env["NODE_ENV"] === "production";
export const IS_SERVER = !IS_BROWSER;
export const IS_STORYBOOK = process.env["STORYBOOK"] === "true";
