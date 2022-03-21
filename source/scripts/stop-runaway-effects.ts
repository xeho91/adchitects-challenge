import { IS_DEVELOPMENT } from "$globals";

if (IS_DEVELOPMENT) {
	/*
	  eslint-disable-next-line
	  @typescript-eslint/no-var-requires,
	  unicorn/prefer-module
	*/
	const { hijackEffects } = require("stop-runaway-react-effects");

	hijackEffects({ callCount: 30, timeLimit: 500 });
}
