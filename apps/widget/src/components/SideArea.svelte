<script lang="ts">
	import type { Snippet } from "svelte";
	import { clickOutside } from "@svar-ui/lib-dom";
	import { fly } from "svelte/transition";

	type Props = {
		position?: "right";
		css?: string;
		children?: Snippet;
		oncancel?: () => void;
	};

	let { position = "right", css = "", children, oncancel }: Props = $props();
</script>

<div
	class="wx-sidearea wx-pos-{position} {css}"
	use:clickOutside={() => oncancel?.()}
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
		max-height: 100%;
	}
	.wx-sidearea.wx-pos-right {
		right: 0;
		top: 0;
	}
</style>
