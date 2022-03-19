/** @type {import("stylelint").Config} */
const config = {
	extends: "@terminal-nerds/stylelint-config",
	rules: {
		"declaration-empty-line-before": undefined,
		"declaration-block-no-redundant-longhand-properties": undefined,
	},
};

module.exports = config;
