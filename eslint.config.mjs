import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginSvelte from 'eslint-plugin-svelte';
import * as svelteParser from 'svelte-eslint-parser';
import tsLint from "typescript-eslint";
import jsLint from "@eslint/js";
import vitest from "eslint-plugin-vitest";
import globals from "globals";

export default [{
                ignores: ["node_modules/", "dist/", "build/", "coverage/", "public/", "svelte/vite.config.js"],
        },
	jsLint.configs.recommended,
        ...tsLint.configs.recommended,
        ...eslintPluginSvelte.configs['flat/recommended'],
        eslintConfigPrettier,
        vitest.configs.recommended,
        ...eslintPluginSvelte.configs["flat/prettier"],
        {
                rules: {
                        "no-bitwise": ["error"],
                        // there is a misconception between esLint and svelte compiler
                        // rules that are necessary for compiler, throw errors in esLint
                        // need to be revised with next version of toolchain
                        "svelte/no-unused-svelte-ignore": "off",
                        "svelte/valid-compile": "off",
                        // Ignore unused vars starting with _
                        // "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], 
                        // // Turn off the need for explicit function return types
                        // "@typescript-eslint/explicit-function-return-type": "off",
                        // // Warn when "any" type is used
                        "@typescript-eslint/no-explicit-any": "off",
                        // // Warn on @ts-ignore comments
                        // "@typescript-eslint/ban-ts-comment": "warn",
                        // // Public methods should have return types
                        // "@typescript-eslint/explicit-module-boundary-types": "error",
                },
        },
        {
                languageOptions: {
                        globals: { ...globals.browser, ...globals.es2022 },
                        ecmaVersion: 2022,
                        sourceType: "module",
                        parserOptions: {
                                extraFileExtensions: [".svelte"],
                                warnOnUnsupportedTypeScriptVersion: false,
                                tsconfigRootDir: import.meta.dirname,
                        },
                },

        },
        {

                files: ["**/*.svelte"],
                rules: {
                        "@typescript-eslint/no-unused-expressions": "off"
                }
        },
        {       
                // temporarily ignore cypress folder
                ignores: [
                        "**/cypress/" 
                ]
        },
        {

                files: ["**/*.svelte.js"],
                languageOptions: {
                        parser: svelteParser,
                }
        }
];
