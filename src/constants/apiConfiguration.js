export const PRODUCTION_API_END_POINT =
	"https://chatgpt-mobile-server.vercel.app/";
export const TEST_API_END_POINT = "http://localhost:8008";

/**
 * @description - dont forget to change this to 'production' before building the app
 * @type {string}
 * @constant
 * @default 'TEST'
 * @permissibleValues 'TEST' | 'PRODUCTION'
 */
export const MODE = "PRODUCTION";

export const API_END_POINT =
	MODE === "TEST" ? TEST_API_END_POINT : PRODUCTION_API_END_POINT;
