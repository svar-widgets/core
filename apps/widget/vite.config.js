import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite-plus";

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		dedupe: ["svelte"],
	},
});
