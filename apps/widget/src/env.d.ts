/// <reference types="svelte" />
declare module "@svar-ui/core-locales";

declare module "*.svelte" {
	import type { Component } from "svelte";
	const component: Component<any>;
	export default component;
}
