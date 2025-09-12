<script>
	import { clickOutside, calculatePosition } from "@svar-ui/lib-dom";
	import { onMount } from "svelte";

	let {
		left = 0,
		top = 0,
		at = "bottom",
		parent = null,
		oncancel,
		mount,
		children,
	} = $props();

	let self = null;
	let x = $state(0);
	let y = $state(0);
	let width = $state("auto");

	function updatePosition() {
		if (!self) return;

		const result = calculatePosition(self, parent, at, left, top);
		if (result) {
			x = result.x;
			y = result.y;
			width = result.width;
		}
	}

	if (mount) mount(updatePosition);
	onMount(updatePosition);
	$effect(() => {
		updatePosition(parent);
	});

	function down(e) {
		oncancel && oncancel(e);
	}
</script>

<div
	use:clickOutside={down}
	bind:this={self}
	class="wx-popup"
	style="position:fixed;top:{y}px;left:{x}px;width:{width};"
>
	{@render children?.()}
</div>

<style>
	.wx-popup {
		z-index: var(--wx-popup-z-index);
		background: var(--wx-popup-background);
		box-shadow: var(--wx-popup-shadow);
		border: var(--wx-popup-border);
		border-radius: var(--wx-popup-border-radius);
		overflow: hidden;
	}
</style>
