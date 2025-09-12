<script>
	import { clickOutside } from "@svar-ui/lib-dom";
	import { fly } from "svelte/transition";

	let { position = "right", children, oncancel } = $props();
</script>

<div
	class="wx-sidearea wx-pos-{position}"
	use:clickOutside={() => oncancel && oncancel()}
	transition:fly={{ x: 650, opacity: 1 }}
>
	{@render children?.()}
</div>

<style>
	.wx-sidearea {
		position: absolute;
		z-index: var(--wx-popup-z-index);
		background: var(--wx-modal-background);
		box-shadow: var(--wx-modal-shadow);
		border: var(--wx-modal-border);
		border-radius: var(--wx-modal-border-radius);
		min-width: var(--wx-modal-width);
		height: 100vh;
	}
	.wx-sidearea.wx-pos-right {
		right: 0;
		top: 0;
	}
</style>
