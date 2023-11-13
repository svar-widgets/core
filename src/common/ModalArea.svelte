<script>
	import { fade } from "svelte/transition";

</script>

<div class="modal" transition:fade={{ duration: 100 }}>
	<div class="window">
		<slot />
	</div>
</div>

<style>
	.modal {
		position: absolute;
		z-index: var(--wx-modal-z-index);
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--wx-modal-backdrop);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.window {
		background: var(--wx-modal-background);
		box-shadow: var(--wx-modal-shadow);
		border: var(--wx-modal-border);
		border-radius: var(--wx-modal-border-radius);
		min-width: var(--wx-modal-width);
	}

</style>
