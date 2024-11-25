<script>
	import { onMount, getContext, onDestroy } from "svelte";

	let portal = null;

	let { theme = $bindable(""), target, children } = $props();

	let handlers = [];
	export const mount = h => {
		if (handlers) handlers.push(h);
	};

	if (theme === "") theme = getContext("wx-theme");

	function getParentRoot(p) {
		while (p !== document.body && !p.getAttribute("data-wx-portal-root")) {
			p = p.parentNode;
		}
		return p;
	}
	onMount(() => {
		let currentTarget = target || getParentRoot(portal);
		currentTarget.appendChild(portal);
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
