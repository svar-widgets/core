<script>
	import { onMount, getContext } from "svelte";
	import Button from "./Button.svelte";

	//helpers
	import { sliderMove } from "./helpers/sliderMove";
	import colorTransformator from "./helpers/colorTransformator";
	import { parseColor } from "./helpers/colorValidation.js";
	import { defaultLocale } from "./helpers/locale";

	let { value = $bindable("#65D3B3"), button = false, onchange } = $props();

	let block;

	const _ = (getContext("wx-i18n") || defaultLocale()).getGroup("core");

	const BLOCK = "Block";
	const LINE = "Line";

	let blockTop = $state();
	let blockLeft = $state();
	let hueColor = $state();
	let colorLine = $state();
	let lineLeft = $state();

	let color = $derived(parseColor(value) || "#65D3B3");
	let blockColor = $derived(colorTransformator.hvsToHex(hueColor, 1, 1));

	function moveBlockSlider(dx, dy) {
		const { width, height } = block.getBoundingClientRect();

		if (dy < 0) dy = 0;
		else if (dy > height) dy = height;

		if (dx < 0) dx = 0;
		else if (dx > width) dx = width;

		blockTop = dy;
		blockLeft = dx;

		setCurrentColor();
	}

	function setCurrentColor(lineSliderMove) {
		let _sValue, _vValue;

		if (lineSliderMove) {
			[, _sValue, _vValue] = colorTransformator.hexToHvs(color);
		} else {
			const { width, height } = block.getBoundingClientRect();

			const pxX = width / 100;
			const pxY = height / 100;

			_sValue = Math.ceil(blockLeft / pxX) / 100;
			_vValue = Math.ceil(Math.abs(blockTop / pxY - 100)) / 100;
		}

		value = colorTransformator.hvsToHex(hueColor, _sValue, _vValue);
		onchange && onchange({ value, input: true });
	}

	function moveLineSlider(dx) {
		const width = colorLine.getBoundingClientRect().width;

		if (dx < 0) dx = 0;
		else if (dx > width) dx = width;

		toggleLineColor(dx, width);
	}

	function toggleLineColor(dx, width) {
		width = width || colorLine.getBoundingClientRect().width;

		lineLeft = dx;

		const h = Math.round((lineLeft * 359) / width);
		hueColor = Math.max(Math.min(h, 359), 0);

		setCurrentColor(true);
	}

	onMount(() => setSlidersPosition());

	function setSlidersPosition() {
		const [h, s, v] = colorTransformator.hexToHvs(color);
		const { width, height } = block.getBoundingClientRect();
		hueColor = h;

		lineLeft = (h * colorLine.getBoundingClientRect().width) / 359;
		blockLeft = s * width;
		blockTop = Math.abs(height * (v - 1));
	}

	function handleChange({ target }) {
		const newColor = parseColor(target.value);

		value = newColor;
		onchange && onchange({ value, input: true });
		if (newColor) {
			setSlidersPosition();
		}
	}

	function handleSelect(ev) {
		ev.stopPropagation();
		onchange && onchange({ value: color });
	}

	function keydown(ev) {
		const slider = ev.target;
		const isSliderBlock = slider === BLOCK;
		const isSliderLine = slider === LINE;

		let css = window.getComputedStyle(slider);
		let left = parseFloat(css.left);
		let top = parseFloat(css.top);
		const code = ev.code;

		if (isSliderBlock) {
			switch (code) {
				case "ArrowLeft": {
					left--;
					break;
				}
				case "ArrowRight": {
					left++;
					break;
				}
				case "ArrowDown": {
					top++;
					break;
				}
				case "ArrowUp": {
					top--;
					break;
				}
				default:
					return;
			}

			moveBlockSlider(left, top);
		}

		if (isSliderLine) {
			if (code === "ArrowLeft" || code === "ArrowDown") left--;
			else if (code === "ArrowRight" || code === "ArrowUp") left++;
			else return;
			moveLineSlider(left);
		}

		ev.preventDefault();
	}
</script>

<div class="wx-colorboard">
	<div
		class="wx-color-block"
		style="background: {blockColor};"
		bind:this={block}
		use:sliderMove={{ moveBlockSlider }}
	>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="wx-color-block-slider wx-slider"
			style="background: {color}; top: {blockTop}px; left:{blockLeft}px;"
			tabindex="0"
			data-slider={BLOCK}
			onkeydown={keydown}
		></div>
	</div>
	<div
		class="wx-color-line"
		bind:this={colorLine}
		use:sliderMove={{ moveLineSlider }}
	>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="wx-color-line-slider wx-slider"
			style="background: {blockColor}; left: {lineLeft}px;"
			tabindex="0"
			data-slider={LINE}
			onkeydown={keydown}
		></div>
	</div>
	<div class="wx-color-controls">
		<div class="wx-color" style="background: {color}"></div>
		<input type="text" class="wx-text" bind:value onchange={handleChange} />
	</div>
	{#if button}
		<Button onclick={handleSelect} type="secondary">{_("select")}</Button>
	{/if}
</div>

<style>
	.wx-colorboard {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 8px;
		width: 100%;
	}

	.wx-color-block {
		height: 140px;
		width: 100%;
		position: relative;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.wx-color-block::before,
	.wx-color-block::after {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.wx-color-block:before {
		background-image: linear-gradient(0deg, #000, hsla(0, 0%, 100%, 0));
		z-index: 2;
	}
	.wx-color-block::after {
		background-image: linear-gradient(90deg, #fff, hsla(20, 42%, 65%, 0));
		z-index: 1;
	}

	.wx-color-block-slider {
		height: 16px;
		width: 16px;
		margin: -8px 0 0 -8px;
	}

	.wx-slider {
		border: 2px solid white;
		border-radius: 50%;
		position: absolute;
		z-index: 3;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.wx-slider:focus,
	.wx-slider:hover {
		outline: none;
		box-shadow:
			0 1px 3px rgba(0, 0, 0, 0.2),
			inset 0 0 4px #ffffff;
	}

	.wx-color-line {
		width: 100%;
		height: 8px;
		background-image: linear-gradient(
			90deg,
			red,
			#ff0 17%,
			#0f0 33%,
			#0ff 50%,
			#00f 67%,
			#f0f 83%,
			red
		);
		position: relative;
		border-radius: 6px;
	}

	.wx-color-line-slider {
		height: 14px;
		width: 14px;
		margin: 0 0 0 -7px;
		top: -4px;
	}

	.wx-color-controls {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.wx-color,
	.wx-text {
		width: calc(50% - 4px);
	}

	.wx-color {
		height: 32px;
	}

	.wx-text {
		outline: none;
		background: var(--wx-input-background);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		padding: var(--wx-input-padding);
	}

	.wx-text:focus {
		border: var(--wx-input-border-focus);
	}
</style>
