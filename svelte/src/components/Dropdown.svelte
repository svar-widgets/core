<script>
	import { clickOutside } from "@svar-ui/lib-dom";
	import { env } from "@svar-ui/lib-dom";

	let {
		position = "bottom",
		align = "start",
		autoFit = true,
		oncancel,
		width = "100%",
		children,
	} = $props();

	let node;
	$effect(() => {
		if (autoFit) {
			const nodeCoords = node.getBoundingClientRect();
			const bodyCoords = env.getTopNode(node).getBoundingClientRect();

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
		oncancel && oncancel(e);
	}
</script>

<div
	use:clickOutside={down}
	bind:this={node}
	class="wx-dropdown {`wx-${position}-${align}`}"
	style="width:{width}"
>
	{@render children?.()}
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
