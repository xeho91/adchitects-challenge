export const SECONDS_A_MINUTE = 60;
export const SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
export const SECONDS_A_DAY = SECONDS_A_HOUR * 24;
export const SECONDS_A_WEEK = SECONDS_A_DAY * 7;

export const MILLISECONDS_A_SECOND = 1000;
export const MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
export const MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;

export const secondsToMilliseconds = (second: number) =>
	MILLISECONDS_A_SECOND * second;
export const minutesToMilliseconds = (minute: number) =>
	MILLISECONDS_A_SECOND * minute;
export const hoursToMilliseconds = (hour: number) =>
	MILLISECONDS_A_SECOND * hour;
export const milisecondsToSeconds = (miliseconds: number) =>
	Math.round(miliseconds / MILLISECONDS_A_SECOND);
export const minutesToSeconds = (minutes: number) => SECONDS_A_MINUTE * minutes;
export const hoursToSeconds = (hour: number) => SECONDS_A_HOUR * hour;
