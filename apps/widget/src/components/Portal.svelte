<script lang="ts">
	import { onMount, getContext, onDestroy, type Snippet } from "svelte";
	import { env } from "@svar-ui/lib-dom";
	import type { TPortalMount } from "../types";

	type Props = {
		theme?: string;
		target?: HTMLElement;
		children?: Snippet<[{ mount: TPortalMount }]>;
	};

	let portal: HTMLElement | null = null;

	let { theme = $bindable(""), target, children }: Props = $props();

	let handlers: (() => void)[] = [];
	export const mount: TPortalMount = h => {
		if (handlers) handlers.push(h);
	};

	if (theme === "") theme = getContext("wx-theme");

	function getParentRoot(p: HTMLElement) {
		const root = env.getTopNode(p);
		while (p !== root && !p.getAttribute("data-wx-portal-root")) {
			p = p.parentNode as HTMLElement;
		}
		return p;
	}

	onMount(() => {
		let currentTarget = target || getParentRoot(portal!);
		currentTarget.appendChild(portal!);
		if (handlers) handlers.forEach(h => h());
	});

	onDestroy(() => {
		if (portal && portal.parentNode) portal.parentNode.removeChild(portal);
	});
</script>

<div class="wx-portal">
	<div class="wx-{theme}-theme" bind:this={portal}>
		{@render children?.({ mount })}
	</div>
</div>

<style>
	.wx-portal {
		display: none;
	}
</style>
