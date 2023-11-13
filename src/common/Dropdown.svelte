<script>
	import { afterUpdate } from "svelte";

	export let position = "bottom";
	export let align = "start";
	export let autoFit = true;
	export let cancel = null;
	export let width = "100%";

	let node;

	afterUpdate(() => {
		if (autoFit) {
			const nodeCoords = node.getBoundingClientRect();
			const bodyCoords = document.body.getBoundingClientRect();

			if (nodeCoords.right >= bodyCoords.right) {
				align = "end";
			}

			if (nodeCoords.bottom >= bodyCoords.bottom) {
				position = "top";
			}
			return `${position}-${align}`;
		}
	});

	function down(e) {
		if (new Date() - initDate < 200) return;

		if (!node.contains(e.target)) {
			if (cancel) cancel(e);
		}
	}

	const initDate = new Date();

</script>

<svelte:body on:click={down} />

<div
	bind:this={node}
	class="dropdown {`${position}-${align}`}"
	style="width:{width}">
	<slot />
</div>

<style>
	.dropdown {
		position: absolute;
		z-index: 5;
		background: var(--wx-popup-background);
		box-shadow: var(--wx-popup-shadow);
		border: var(--wx-popup-border);
		border-radius: var(--wx-popup-border-radius);
		overflow: hidden;
	}

	.top-center {
		top: 0;
		left: 50%;
		transform: translate(-50%, -100%) translateY(-2px);
	}

	.top-start {
		top: 0;
		left: 0;
		transform: translateY(-100%) translateY(-2px);
	}

	.top-end {
		top: 0;
		right: 0;
		transform: translateY(-100%) translateY(-2px);
	}

	.bottom-center {
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 100%) translateY(2px);
	}

	.bottom-start {
		bottom: 0;
		left: 0;
		transform: translateY(100%) translateY(2px);
	}

	.bottom-end {
		bottom: 0;
		right: 0;
		transform: translateY(100%) translateY(2px);
	}

	.left-center {
		bottom: 50%;
		left: 0;
		transform: translate(-100%, 50%) translateX(-2px);
	}

	.left-start {
		top: 0;
		left: 0;
		transform: translateX(-100%) translateX(-2px);
	}

	.left-end {
		bottom: 0;
		left: 0;
		transform: translateX(-100%) translateX(-2px);
	}

	.right-center {
		bottom: 50%;
		right: 0;
		transform: translate(100%, 50%) translateX(2px);
	}

	.right-start {
		top: 0;
		right: 0;
		transform: translateX(100%) translateX(2px);
	}

	.right-end {
		bottom: 0;
		right: 0;
		transform: translateX(100%) translateX(2px);
	}

</style>
