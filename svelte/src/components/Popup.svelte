<script>
	import { clickOutside, calculatePosition, getAbsParent } from "@svar-ui/lib-dom";
	import { onMount } from "svelte";

	let {
		left = 0,
		top = 0,
		at = "bottom",
		parent = null,
		width = "auto",
		css = "",
		oncancel,
		children,
		trackScroll = false,
	} = $props();

	let self = $state(null);
	let x = $state(0);
	let y = $state(0);
	let w = $state("auto");
	let portal;

	function getWidth(calcWidth) {
		if (parent && (width + "").indexOf("%") > -1) {
			return width.replace(/(\d+)%/, (match, value) => {
				value = (value * parent.offsetWidth) / 100 + "px";
				return width.replace(match, value);
			});
		}
		return width && width !== "auto" ? width : calcWidth;
	}

	function updatePosition() {
		if (!self) return;
		const result = calculatePosition(self, parent, at, left, top);
		if (result) {
			x = result.x;
			y = result.y;
			w = getWidth(result.width);
		}
	}

	function onScroll(e) {
		if (oncancel && e.target !== portal && self && !self.contains(e.target))
			oncancel(e);
	}

	onMount(() => {
		requestAnimationFrame(() => {
			updatePosition();
			if (trackScroll) {
				portal = getAbsParent(self);
				if (portal) portal.addEventListener("scroll", onScroll, true);
			}
		});
		return () => {
			if (trackScroll && portal)
				portal.removeEventListener("scroll", onScroll, true);
		};
	});

	$effect(() => {
		updatePosition();
	});

	function down(e) {
		oncancel && oncancel(e);
	}
</script>

<div
	use:clickOutside={down}
	bind:this={self}
	class="wx-popup {css}"
	style="position:absolute;top:{y}px;left:{x}px;width:{w};"
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
