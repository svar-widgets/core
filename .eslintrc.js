module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: ["plugin:cypress/recommended", "eslint:recommended", "prettier"],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		extraFileExtensions: [".svelte"],
	},
	plugins: ["svelte3"],

	overrides: [
		{
			files: ["*.svelte"],
			processor: "svelte3/svelte3",
		},
	],
	settings: {
		// [todo] we can add stylelint for this
		"svelte3/ignore-styles": () => true,
	},
	rules: {
		"no-bitwise": ["error"],
	},
};
