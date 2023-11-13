<script>
	import { createEventDispatcher, onMount } from "svelte";
	import Button from "./Button.svelte";

	//helpers
	import { sliderMove } from "./helpers/sliderMove";
	import colorTransformator from "./helpers/colorTransformator";
	import { parseColor } from "./helpers/colorValidation.js";

	const dispatch = createEventDispatcher();

	export let value = "#65D3B3";
	export let button = false;

	let color;
	$: color = parseColor(value) || "#65D3B3";

	let block;
	let blockTop;
	let blockLeft;
	let blockColor;

	let colorLine;
	let lineLeft;

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
	}

	let hueColor;
	$: blockColor = colorTransformator.hvsToHex(hueColor, 1, 1);

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

		value = color = newColor;
		if (newColor) {
			setSlidersPosition();
		}
	}

	function handleSelect(ev) {
		ev.stopPropagation();
		dispatch("change", { value: color });
	}

	const BLOCK = "Block";
	const LINE = "Line";

	function keydown(ev) {
		const slider = ev.target;
		const isSliderBlock = slider.dataset.slider === BLOCK;
		const isSliderLine = slider.dataset.slider === LINE;

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

<div class="color-select">
	<div
		class="color-block"
		style="background: {blockColor};"
		bind:this={block}
		use:sliderMove={{ moveBlockSlider }}>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="color-block__slider slider"
			style="background: {color}; top: {blockTop}px; left:{blockLeft}px;"
			tabindex="0"
			data-slider={BLOCK}
			on:keydown={keydown} />
	</div>
	<div
		class="color-line"
		bind:this={colorLine}
		use:sliderMove={{ moveLineSlider }}>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="color-line__slider slider"
			style="background: {blockColor}; left: {lineLeft}px;"
			tabindex="0"
			data-slider={LINE}
			on:keydown={keydown} />
	</div>
	<div class="color-controls">
		<div class="color" style="background: {color}" />
		<input type="text" class="text" bind:value on:change={handleChange} />
	</div>
	{#if button}
		<Button click={handleSelect} type={'secondary'}>Select</Button>
	{/if}
</div>

<style>
	.color-select {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 8px;
		width: 100%;
	}

	.color-block {
		height: 140px;
		width: 100%;
		position: relative;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.color-block::before,
	.color-block::after {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.color-block:before {
		background-image: linear-gradient(0deg, #000, hsla(0, 0%, 100%, 0));
		z-index: 2;
	}
	.color-block::after {
		background-image: linear-gradient(90deg, #fff, hsla(20, 42%, 65%, 0));
		z-index: 1;
	}

	.color-block__slider {
		height: 16px;
		width: 16px;
		margin: -8px 0 0 -8px;
	}

	.slider {
		border: 2px solid white;
		border-radius: 50%;
		position: absolute;
		z-index: 3;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.slider:focus,
	.slider:hover {
		outline: none;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 0 4px #ffffff;
	}

	.color-line {
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

	.color-line__slider {
		height: 14px;
		width: 14px;
		margin: 0 0 0 -7px;
		top: -4px;
	}

	.color-controls {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.color,
	.text {
		width: calc(50% - 4px);
	}

	.color {
		height: 32px;
	}

	.text {
		outline: none;
		background: var(--wx-input-background);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weigth);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		padding: var(--wx-input-padding);
	}

	.text:focus {
		border: var(--wx-input-border-focus);
	}

</style>
