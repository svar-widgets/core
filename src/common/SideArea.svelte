<script>
	import { createEventDispatcher } from "svelte";
	import { clickOutside } from "@wx/lib-dom";
	import { fly } from "svelte/transition";

	const dispatch = createEventDispatcher();
	export let position = "right";

</script>

<div
	class="window pos-{position}"
	use:clickOutside={() => dispatch('close')}
	transition:fly={{ x: 650, opacity: 1 }}>
	<slot />
</div>

<style>
	.window {
		position: absolute;
		background: var(--wx-modal-background);
		box-shadow: var(--wx-modal-shadow);
		border: var(--wx-modal-border);
		border-radius: var(--wx-modal-border-radius);
		min-width: var(--wx-modal-width);
		height: 100vh;
	}
	.window.pos-right {
		right: 0;
		top: 0;
	}

</style>
