const config = {
	plugins: {
		// https://tailwindcss.com/docs/installation
		"tailwindcss": {},

		// https://github.com/luisrudge/postcss-flexbugs-fixes
		"postcss-flexbugs-fixes": {},

		// https://preset-env.cssdb.org
		"postcss-preset-env": {
			autoprefixer: {
				flexbox: false,
			},
			stage: 1,
			features: {
				// https://preset-env.cssdb.org/features
			},
		},
	},
};

// eslint-disable-next-line unicorn/prefer-module
module.exports = config;
