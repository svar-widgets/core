import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite-plus";

export default defineConfig({
	base: "./",
	plugins: [svelte()],
	resolve: {
		dedupe: ["svelte"],
	},
	server: {
		port: 3103,
		host: "0.0.0.0",
	},
});
