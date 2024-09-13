<script>
	import { clickOutside } from "@wx/lib-dom";
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
		if (cancel) cancel(e);
	}
</script>

<div
	use:clickOutside={down}
	bind:this={node}
	class="wx-dropdown {`wx-${position}-${align}`}"
	style="width:{width}"
>
	<slot />
</div>

<style>
	.wx-dropdown {
		position: absolute;
		z-index: 5;
		background: var(--wx-popup-background);
		box-shadow: var(--wx-popup-shadow);
		border: var(--wx-popup-border);
		border-radius: var(--wx-popup-border-radius);
		overflow: hidden;
	}

	.wx-top-center {
		top: 0;
		left: 50%;
		transform: translate(-50%, -100%) translateY(-2px);
	}

	.wx-top-start {
		top: 0;
		left: 0;
		transform: translateY(-100%) translateY(-2px);
	}

	.wx-top-end {
		top: 0;
		right: 0;
		transform: translateY(-100%) translateY(-2px);
	}

	.wx-bottom-center {
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 100%) translateY(2px);
	}

	.wx-bottom-start {
		bottom: 0;
		left: 0;
		transform: translateY(100%) translateY(2px);
	}

	.wx-bottom-end {
		bottom: 0;
		right: 0;
		transform: translateY(100%) translateY(2px);
	}

	.wx-left-center {
		bottom: 50%;
		left: 0;
		transform: translate(-100%, 50%) translateX(-2px);
	}

	.wx-left-start {
		top: 0;
		left: 0;
		transform: translateX(-100%) translateX(-2px);
	}

	.wx-left-end {
		bottom: 0;
		left: 0;
		transform: translateX(-100%) translateX(-2px);
	}

	.wx-right-center {
		bottom: 50%;
		right: 0;
		transform: translate(100%, 50%) translateX(2px);
	}

	.wx-right-start {
		top: 0;
		right: 0;
		transform: translateX(100%) translateX(2px);
	}

	.wx-right-end {
		bottom: 0;
		right: 0;
		transform: translateX(100%) translateX(2px);
	}
</style>
