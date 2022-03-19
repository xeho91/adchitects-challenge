const config = {
	extends: ["@terminal-nerds"],

	env: {
		// Specify the environment(s)
		// https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
		browser: true,
		node: true,
	},

	rules: {
		"unicorn/prevent-abbreviations": ["warn"],
		// TypeScript might have features not supported in a specific Node.js version.
		// @see https://github.com/mysticatea/eslint-plugin-node/issues/250
		"node/no-unsupported-features/es-syntax": "off",
	},
};

// eslint-disable-next-line unicorn/prefer-module
module.exports = config;
