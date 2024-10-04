import { loadEnv } from "vite";
import { resolve } from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { visualizer } from "rollup-plugin-visualizer";

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "WX") };

	let build,
		publicDir = resolve(__dirname, "public"),
		server = {},
		base = "",
		plugins = [svelte({})];

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
				name: "core",
				formats: ["es"],
				fileName: format => `core.${format}.js`,
			},
			outDir: "./dist",
			sourcemap: true,
			minify: true,
			target: "esnext",
		};
		publicDir = false;
		plugins.push(visualizer({ filename: "dist/stats.html" }));
	}

	return {
		base,
		build,
		publicDir,
		resolve: { dedupe: ["svelte"] },
		plugins,
		server,
	};
};
