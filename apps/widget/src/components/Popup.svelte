<script lang="ts">
	import {
		clickOutside,
		calculatePosition,
		getAbsParent,
		type TPosition,
	} from "@svar-ui/lib-dom";
	import { onMount, type Snippet } from "svelte";

	type Props = {
		left?: number;
		top?: number;
		at?: TPosition;
		parent?: HTMLElement | null;
		width?: string;
		css?: string;
		oncancel?: (ev: MouseEvent) => void;
		children?: Snippet;
		trackScroll?: boolean;
	};

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
	}: Props = $props();

	let self = $state<HTMLElement | null>(null);
	let x = $state(0);
	let y = $state(0);
	let w = $state("auto");
	let portal: HTMLElement | null;

	function getWidth(calcWidth: string) {
		if (parent && (width + "").indexOf("%") > -1) {
			return width.replace(/(\d+)%/, (match, value: string) => {
				value = (+value * parent!.offsetWidth) / 100 + "px";
				return width.replace(match, value);
			});
		}
		return width && width !== "auto" ? width : calcWidth;
	}

	function updatePosition() {
		if (!self) return;
		const result = calculatePosition(self, parent!, at, left, top);
		if (result) {
			x = result.x;
			y = result.y;
			w = getWidth(result.width);
		}
	}

	// closes the popup when its scrollable parent is scrolled,
	// oncancel gets the scroll event here
	function onScroll(e: Event) {
		if (
			oncancel &&
			e.target !== portal &&
			self &&
			!self.contains(e.target as Node)
		)
			oncancel(e as MouseEvent);
	}

	onMount(() => {
		let resizeObserver: ResizeObserver;
		requestAnimationFrame(() => {
			updatePosition();
			if (trackScroll) {
				portal = getAbsParent(self!);
				if (portal) portal.addEventListener("scroll", onScroll, true);
			}
			if (parent) {
				resizeObserver = new ResizeObserver(updatePosition);
				resizeObserver.observe(parent);
			}
		});
		return () => {
			if (trackScroll && portal)
				portal.removeEventListener("scroll", onScroll, true);
			if (resizeObserver) resizeObserver.disconnect();
		};
	});

	$effect(() => {
		updatePosition();
	});

	function down(e: MouseEvent) {
		oncancel?.(e);
	}
</script>

<div
	use:clickOutside={{ callback: down, parent: () => parent as HTMLElement }}
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
