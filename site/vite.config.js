import { resolve } from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default () => {
	let build,
		publicDir = resolve(__dirname, "public"),
		server = {},
		base = "",
		plugins = [svelte({})];

	build = {
		rollupOptions: {
			input: { index: resolve(__dirname, "index.html") },
		},
	};

	return {
		base,
		build,
		publicDir,
		resolve: { dedupe: ["svelte"] },
		plugins,
		server,
	};
};
