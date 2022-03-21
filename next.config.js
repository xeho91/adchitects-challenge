/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */

const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});
const withPlugins = require("next-compose-plugins");

const IS_DEVELOPMENT = process.env["NODE_ENV"] === "development";

/** @type { import("next").NextConfig } */
const nextConfig = {
	distDir: ".next/",

	images: {
		domains: ["i.ibb.co"],
	},

	// React
	reactStrictMode: IS_DEVELOPMENT,

	// Sass
	sassOptions: {
		includePaths: [
			path.join(__dirname, "source/styles/globals"),
			path.join(__dirname, "source/styles/mixins"),
		],
	},

	// Minification
	swcMinify: !IS_DEVELOPMENT,

	// TypeScript
	typescript: {
		ignoreBuildErrors: false,
	},

	webpack: (config, { dev, isServer }) => {
		config.module.rules = [
			...config.module.rules,
			// ensure the barrel files don't constitute imports
			{
				test: /index.ts/i,
				sideEffects: false,
			},
		];

		return config;
	},
};

const plugins = [
	// https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer
	[withBundleAnalyzer],
];

// eslint-disable-next-line unicorn/prefer-module
module.exports = withPlugins(plugins, nextConfig);
