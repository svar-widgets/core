<script>
	import { calculatePosition, getAbsParent } from "@svar-ui/lib-dom";
	import Portal from "./Portal.svelte";

	const {
		at = "top-center",
		arrow = false,
		touch = false,
		overflow = false,
		delay = 300,
		content: Content = null,
		resolver = defaultResolver,
		children,
		css = "",
	} = $props();

	const side = $derived.by(() => getSide(at));
	const align = $derived.by(() => getAlign(at));
	const resolvedAt = $derived.by(() => {
		if (at === "point") return "point";
		return `${side}-${align}`;
	});

	let areaNode;
	let isHovered = false;
	let tooltipNode = $state(null);
	let match = $state(null); // { result, anchor, mouseX, mouseY }
	let position = $state(null); // { x, y, z, side, arrowOffset }
	let firstAnchor = $state(false);

	// render only when there is displayable content
	const shouldRender = $derived(
		match !== null && (!!match.result || Content != null)
	);

	function getSide(at) {
		if (at === "point") return "point";
		const split = at.split("-");
		return split[0];
	}

	function getAlign(at) {
		if (at === "point") return "center";
		const split = at.split("-");
		return split.length === 1 ? "center" : split[1];
	}

	function readCSSPropertyInt(node, property, defaultValue) {
		const value = getComputedStyle(node).getPropertyValue(property);
		return parseInt(value) || defaultValue;
	}

	function getPointOffset() {
		return readCSSPropertyInt(tooltipNode, "--wx-tooltip-point-offset", 14);
	}

	function getArrowSize() {
		return readCSSPropertyInt(tooltipNode, "--wx-tooltip-arrow-size", 6);
	}

	// Compute the CSS arrow offset relative to the anchor
	function getArrowOffset(arrowSize, result, rect, body) {
		if (side === "point") return "50%";
		const bodyRect = body?.getBoundingClientRect() ?? { top: 0, left: 0 };
		const h = arrowSize / 2;

		let anchorPoint;
		let tooltipEdge;
		if (side === "top" || side === "bottom") {
			tooltipEdge = result.x - (body?.scrollLeft ?? 0) + bodyRect.left;
			if (align === "start") anchorPoint = rect.left + arrowSize + h;
			else if (align === "end") anchorPoint = rect.right - arrowSize - h;
			else anchorPoint = rect.left + rect.width / 2;
		} else {
			tooltipEdge = result.y - (body?.scrollTop ?? 0) + bodyRect.top;
			if (align === "start") anchorPoint = rect.top + arrowSize + h;
			else if (align === "end") anchorPoint = rect.bottom - arrowSize - h;
			else anchorPoint = rect.top + rect.height / 2;
		}

		return `${anchorPoint - tooltipEdge}px`;
	}

	// Positioning of the tooltip
	$effect(() => {
		if (!tooltipNode || !match) return void (position = null);

		// Offset from the mouse cursor when at="point"
		const offset = at === "point" ? getPointOffset() : 0;

		// Calculate the position of the tooltip
		const result = calculatePosition(
			tooltipNode,
			match.anchor,
			resolvedAt,
			match.mouseX + offset,
			match.mouseY + offset
		);

		if (result === null) return void (position = null);

		// Detect if calculatePosition flipped to the opposite side
		const anchorRect = match.anchor.getBoundingClientRect();
		const body = getAbsParent(tooltipNode);
		const realSide = getSide(result.at);

		// Add gap for the arrow if needed, using realSide for direction
		let arrowOffset = "50%";
		if (result && arrow && at !== "point") {
			const arrowSize = getArrowSize();
			if (realSide === "top") result.y -= arrowSize;
			else if (realSide === "bottom") result.y += arrowSize;
			else if (realSide === "left") result.x -= arrowSize;
			else if (realSide === "right") result.x += arrowSize;
			arrowOffset = getArrowOffset(arrowSize, result, anchorRect, body);
		}

		// Submit the result to the position state
		const minZ = readCSSPropertyInt(
			tooltipNode,
			"--wx-tooltip-z-index",
			1002
		);

		position = {
			x: Math.round(result.x),
			y: Math.round(result.y),
			z: Math.max(result.z, minZ),
			side: realSide,
			arrowOffset,
		};
	});

	function defaultResolver(element) {
		if (overflow && element.scrollWidth <= element.clientWidth) return null;
		const text = element.getAttribute?.("data-tooltip-text");
		return text ? text : null;
	}

	function walk(node, ev) {
		if (!isHovered) return null;

		// Disable tooltip on touch devices if prop touch == false
		const touchD = "ontouchstart" in window || navigator.maxTouchPoints > 0;
		if (touchD && !touch) return null;

		for (; node && node !== areaNode; node = node.parentNode) {
			if (node.nodeType !== Node.ELEMENT_NODE) continue;

			const result = resolver(node, ev);
			if (result == null) continue;

			return {
				result,
				anchor: node,
				mouseX: ev.clientX,
				mouseY: ev.clientY,
			};
		}

		return null;
	}

	let timer;
	let hiding = false;
	function debounce(fn, ...args) {
		clearTimeout(timer);
		timer = setTimeout(fn, delay, ...args);
	}

	function onmousemove(ev) {
		// (1) Ignore if the most closely hovered tooltip area is not this one (in case of nested tooltips)
		if (ev.target.closest(".wx-tooltip-area") !== areaNode) {
			isHovered = false;
			match = null;
			clearTimeout(timer);
			return;
		}
		isHovered = true;

		// (2) If the cursor is still within the anchor element
		if (match?.anchor?.contains(ev.target)) {
			clearTimeout(timer);
			hiding = false;
			const result = resolver(ev.target, ev);
			if (result != null) {
				match = {
					result,
					anchor: ev.target,
					mouseX: ev.clientX,
					mouseY: ev.clientY,
				};
				return;
			}
		}

		// (3) Cursor left the anchor - walk for a new anchor
		if (match !== null) {
			const result = walk(ev.target, ev);
			if (!result) {
				if (!hiding) {
					hiding = true;
					debounce(() => {
						hiding = false;
						match = null;
					});
				}
			} else {
				clearTimeout(timer);
				hiding = false;
				match = result;
				firstAnchor = false;
			}
		} else {
			debounce(() => {
				match = walk(ev.target, ev);
				firstAnchor = true;
			});
		}
	}

	function onmouseleave() {
		debounce(() => {
			hiding = false;
			isHovered = false;
			match = null;
		});
	}

	function onscroll() {
		clearTimeout(timer);
		match = null;
	}

	$effect(() => {
		window.addEventListener("scroll", onscroll, {
			capture: true,
			passive: true,
		});

		return () => {
			clearTimeout(timer);
			window.removeEventListener("scroll", onscroll, { capture: true });
		};
	});
</script>

<div
	bind:this={areaNode}
	class="wx-tooltip-area"
	role="none"
	{onmousemove}
	{onmouseleave}
>
	{#if shouldRender}
		<Portal>
			<div
				class={`wx-tooltip ${css}`}
				class:wx-arrow-top={arrow && position?.side === "top"}
				class:wx-arrow-bottom={arrow && position?.side === "bottom"}
				class:wx-arrow-left={arrow && position?.side === "left"}
				class:wx-arrow-right={arrow && position?.side === "right"}
				class:wx-tooltip-transition={!firstAnchor}
				role="tooltip"
				bind:this={tooltipNode}
				style="
					translate:{position?.x ?? 0}px {position?.y ?? 0}px;
					z-index:{position?.z ?? 20};
					{!position ? 'visibility:hidden;' : ''}
					--wx-arrow-offset:{position?.arrowOffset ?? '50%'};
				"
			>
				<div class="wx-tooltip-wrapper">
					<div class="wx-tooltip-inner">
						{#if typeof match.result === "string"}
							{#if Content}
								<Content data={match.result} />
							{:else}
								<div class="wx-tooltip-text">
									{match.result}
								</div>
							{/if}
						{:else if Content}
							<Content {...match.result} />
						{:else}
							<div class="wx-tooltip-text">
								{match.result?.data}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</Portal>
	{/if}

	{@render children()}
</div>

<style>
	.wx-tooltip-area {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.wx-tooltip {
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		border: 1px solid var(--wx-tooltip-border, transparent);
		border-radius: var(--wx-border-radius);
		background-color: var(--wx-tooltip-background);
		color: var(--wx-tooltip-font-color);
		animation: wx-tooltip-appear 100ms ease-out;
	}

	.wx-tooltip-transition {
		transition: translate 50ms ease;
	}

	@keyframes wx-tooltip-appear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.wx-tooltip-inner {
		border-radius: var(--wx-border-radius);
		overflow: hidden;
	}

	.wx-tooltip-text {
		padding: var(--wx-tooltip-padding);
		font: var(--wx-tooltip-font);
		color: var(--wx-tooltip-font-color);
	}

	.wx-tooltip.wx-arrow-top::before,
	.wx-tooltip.wx-arrow-bottom::before,
	.wx-tooltip.wx-arrow-left::before,
	.wx-tooltip.wx-arrow-right::before {
		content: "";
		position: absolute;
		border: var(--wx-tooltip-arrow-size, 6px) solid transparent;
	}

	.wx-tooltip.wx-arrow-top::before {
		top: 100%;
		left: var(--wx-arrow-offset, 50%);
		transform: translateX(-50%);
		border-top-color: var(--wx-tooltip-background);
		filter: drop-shadow(0 1px 0 var(--wx-tooltip-border, transparent));
	}

	.wx-tooltip.wx-arrow-bottom::before {
		bottom: 100%;
		left: var(--wx-arrow-offset, 50%);
		transform: translateX(-50%);
		border-bottom-color: var(--wx-tooltip-background);
		filter: drop-shadow(0 -1px 0 var(--wx-tooltip-border, transparent));
	}

	.wx-tooltip.wx-arrow-left::before {
		top: var(--wx-arrow-offset, 50%);
		left: 100%;
		transform: translateY(-50%);
		border-left-color: var(--wx-tooltip-background);
		filter: drop-shadow(1px 0 0 var(--wx-tooltip-border, transparent));
	}

	.wx-tooltip.wx-arrow-right::before {
		top: var(--wx-arrow-offset, 50%);
		right: 100%;
		transform: translateY(-50%);
		border-right-color: var(--wx-tooltip-background);
		filter: drop-shadow(-1px 0 0 var(--wx-tooltip-border, transparent));
	}
</style>
