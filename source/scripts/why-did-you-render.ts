import React from "react";

import { IS_DEVELOPMENT } from "$globals";

if (IS_DEVELOPMENT) {
	/*
	  eslint-disable-next-line
	  @typescript-eslint/no-var-requires,
	  unicorn/prefer-module
	*/
	const whyDidYouRender = require("@welldone-software/why-did-you-render");

	whyDidYouRender(React, {
		trackAllPureComponents: true,
	});
}
