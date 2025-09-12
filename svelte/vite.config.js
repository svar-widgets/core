import { loadEnv } from "vite";
import { resolve } from "path";
import { existsSync } from "fs";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { visualizer } from "rollup-plugin-visualizer";
import { waitChanges, waitOn } from "@svar-ui/vite-tools";
import conditionalCompile from "vite-plugin-conditional-compile";
import pkg from "./package.json" with { type: "json" };

export default async ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "WX") };
	const files = [];

	if (mode !== "production") {
		const paths = [
			resolve(__dirname, "../store/dist/index.js"),
			resolve(__dirname, "../provider/dist/index.js"),
		];

		paths.forEach(path => {
			if (existsSync(path)) {
				files.push(path);
			}
		});
	}

	const plugins = [];

	if (files.length) plugins.push(waitChanges({ files }));
	if (mode !== "development") plugins.push(conditionalCompile());
	plugins.push(svelte({}));

	const name = pkg.productTag;

	let build,
		publicDir = resolve(__dirname, "public"),
		server = {},
		base = "";

	if (mode === "test") {
		build = {
			rollupOptions: {
				input: { tests: resolve(__dirname, "tests/index.html") },
			},
		};
		server.port = 5100;
	} else {
		build = {
			rollupOptions: {
				input: { index: resolve(__dirname, "index.html") },
			},
		};
	}

	if (process.env.WX_BUILD_STATS) {
		build = {
			lib: {
				entry: resolve(__dirname, "src/index.js"),
				name,
				formats: ["es"],
				fileName: format => `${name}.${format}.js`,
			},
			outDir: "./dist",
			sourcemap: true,
			minify: true,
			target: "esnext",
		};
		publicDir = false;
		plugins.push(visualizer({ filename: "dist/stats.html" }));
	}

	if (files.length) await waitOn({ files });

	return {
		base,
		build,
		publicDir,
		resolve: { dedupe: ["svelte"] },
		plugins,
		server,
		watch: {
			persistent: true,
			include: ["src/**/*.ts", "src/**/*.js"],
		},
	};
};
