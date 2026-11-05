import type { ParsedStack, TestError } from "vite-plus/test";
import { defineConfig } from "vite-plus";

export default defineConfig({
	staged: {
		"*": "vp check --fix",
	},
	lint: {
		options: { typeAware: true, typeCheck: true },
		rules: {
			"no-floating-promises": "off",
		},
	},
	fmt: {
		useTabs: true,
		tabWidth: 4,
		semi: true,
		singleQuote: false,
		quoteProps: "as-needed",
		trailingComma: "es5",
		bracketSpacing: true,
		arrowParens: "avoid",
		printWidth: 80,
		svelte: true,
		overrides: [{ files: ["*.yml", "*.yaml"], options: { tabWidth: 2 } }],
	},
	test: {
		exclude: ["**/node_modules", "apps/tests/**"],
		onStackTrace(error: TestError, { file }: ParsedStack): boolean | void {
			// Reject all frames from third party libraries.
			if (file.includes("node_modules")) {
				return false;
			}
		},
	},
});
