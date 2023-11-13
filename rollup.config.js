import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";
import livereload from "rollup-plugin-livereload";
import visualizer from "rollup-plugin-visualizer";

import pkg from "./package.json";
const name = pkg.productTag;
const watch = !!process.env.ROLLUP_WATCH;

function config(mode, start, format, production, full, limited) {
	return {
		input: start,
		watch: {
			clearScreen: false,
			include: ["src/**/*", "demos/**/*", "site/**/*"],
		},
		output: {
			sourcemap: !limited,
			name: "app",
			format: format,
			file: `public/${mode}/${name}.js`,
		},
		plugins: [
			!production && watch && livereload(),
			svelte({
				// enable run-time checks when not in production
				dev: !production,
				// we'll extract any component CSS out into
				// a separate file — better for performance
				css: css => {
					css.write(`${name}.css`, !limited);
				},
				preprocess: [
					autoPreprocess({
						postcss: require("./postcss.config.js"),
					}),
				],
			}),
			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/rollup-plugin-commonjs
			resolve({
				dedupe: ["svelte"],
			}),
			commonjs(),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser(),
			production &&
				!limited &&
				visualizer({ filename: "public/stats.html", sourcemap: true }),
		],
		moduleContext: () => {
			return "window";
		},
	};
}

export default function (cli) {
	let out = [];
	const production = !!cli["config-production"];
	const limited = !!cli["config-limited"];
	if (!!cli["config-demos"])
		out.push(
			config("demos", "demos/index.js", "iife", production, true, limited)
		);
	else if (!!cli["config-site"])
		out.push(
			config(
				"site/demos",
				"site/main.js",
				"iife",
				production,
				true,
				limited
			)
		);
	else out.push(config("dist", pkg.source, "es", production, false, limited));

	return out;
}
