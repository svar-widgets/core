<script>
	import { clickOutside, calculatePosition } from "wx-lib-dom";
	import { onMount } from "svelte";

	export let left = 0;
	export let top = 0;
	export let at = "bottom";
	export let parent = null;
	export let cancel;
	export let mount;

	let self;

	let x = 0;
	let y = 0;
	let width;

	function updatePosition() {
		const result = calculatePosition(self, parent, at, left, top);
		x = result.x || x;
		y = result.y || y;
		width = result.width || width;
	}

	if (mount) mount(updatePosition);
	onMount(updatePosition);
	$: updatePosition(parent);

	function down(e) {
		if (cancel) cancel(e);
	}
</script>

<div
	use:clickOutside={down}
	bind:this={self}
	class="wx-popup"
	style="top:{y}px;left:{x}px;width:{width};"
>
	<slot />
</div>

<style>
	.wx-popup {
		position: fixed;
		z-index: var(--wx-popup-z-index);
		background: var(--wx-popup-background);
		box-shadow: var(--wx-popup-shadow);
		border: var(--wx-popup-border);
		border-radius: var(--wx-popup-border-radius);
		overflow: hidden;
	}
</style>
