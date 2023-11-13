<script>
	import { afterUpdate } from "svelte";

	export let left = 0;
	export let top = 0;
	export let area = null;
	export let cancel;
	export let mount;

	$: {
		if (area) {
			top = area.top + area.height;
			left = area.left;
		}
	}

	let self;

	function fixPosition() {
		if (!self) return;

		const bodyCoords = document.body.getBoundingClientRect();
		const nodeCoords = self.getBoundingClientRect();

		if (nodeCoords.right >= bodyCoords.right) {
			left = bodyCoords.right - nodeCoords.width;
		}

		if (nodeCoords.bottom >= bodyCoords.bottom) {
			top = bodyCoords.bottom - nodeCoords.height - 12;
		}
	}

	if (area) {
		if (mount) mount(fixPosition);
		afterUpdate(() => fixPosition());
	}

	function down(e) {
		if (!self.contains(e.target)) {
			if (cancel) cancel(e);
		}
	}

</script>

<svelte:body on:mousedown={down} />

<div bind:this={self} class="popup" style="top:{top}px;left:{left}px;">
	<slot />
</div>

<style>
	.popup {
		position: fixed;
		z-index: var(--wx-popup-z-index);
		background: var(--wx-popup-background);
		box-shadow: var(--wx-popup-shadow);
		border: var(--wx-popup-border);
		border-radius: var(--wx-popup-border-radius);
		overflow: hidden;
	}

</style>
