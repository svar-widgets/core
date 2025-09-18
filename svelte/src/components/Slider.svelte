<script>
	import { uid } from "@svar-ui/lib-dom";

	let {
		id = uid(),
		label = "",
		width = "",
		min = 0,
		max = 100,
		value = $bindable(0),
		step = 1,
		title = "",
		disabled = false,
		onchange,
	} = $props();

	let bgStyle = $derived(() => {
		return disabled
			? ""
			: `background: linear-gradient(90deg, var(--wx-slider-primary) 0% ${progress}, var(--wx-slider-background) ${progress} 100%);`;
	});

	let progress = $derived(((value - min) / (max - min)) * 100 + "%");

	let previousInput = value;
	let previousValue = value;
	function oninput({ target }) {
		value = target.value * 1;
		onchange && onchange({ value, previous: previousInput, input: true });
		previousInput = value;
	}
	function change({ target }) {
		value = target.value * 1;
		onchange && onchange({ value, previous: previousValue });
		previousValue = value;
	}
</script>

<div class="wx-slider" style={width ? `width: ${width}` : ""} {title}>
	{#if label}<label for={id}>{label}</label>{/if}
	<div>
		<input
			{id}
			type="range"
			{min}
			{max}
			{step}
			{disabled}
			{value}
			{oninput}
			onchange={change}
			style={bgStyle()}
		/>
	</div>
</div>

<style>
	.wx-slider {
		width: var(--wx-input-width);
	}

	label {
		display: block;
		margin: var(--wx-slider-label-margin);
		font-family: var(--wx-slider-label-font-family);
		font-size: var(--wx-slider-label-font-size);
		line-height: var(--wx-slider-label-line-height);
		font-weight: var(--wx-slider-label-font-weight);
		color: var(--wx-slider-label-font-color);
	}

	.wx-slider div {
		padding: calc(
				(var(--wx-slider-height) - var(--wx-slider-track-height)) / 2
			)
			0;
	}

	input {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		display: block;
		width: 100%;
		height: var(--wx-slider-track-height);
		background: var(--wx-slider-background);
		border: none;
		border-radius: var(--wx-slider-track-border-radius);
		margin: 0;
	}

	input:focus {
		outline: none;
	}

	input::-webkit-slider-runnable-track {
		margin: 0;
		width: 100%;
		height: var(--wx-slider-track-height);
		border: none;
		border-radius: var(--wx-slider-track-border-radius);
		cursor: pointer;
		background: transparent;
	}

	input::-webkit-slider-thumb {
		margin-top: calc(
			(var(--wx-slider-track-height) - var(--wx-slider-thumb-size)) / 2
		);
		width: var(--wx-slider-thumb-size);
		height: var(--wx-slider-thumb-size);
		background: var(--wx-slider-primary);
		border: var(--wx-slider-thumb-border);
		box-shadow: var(--wx-slider-thumb-shadow);
		border-radius: 50%;
		cursor: pointer;
		appearance: none;
	}

	input::-moz-range-track {
		margin: 0;
		width: 100%;
		height: var(--wx-slider-track-height);
		border: none;
		border-radius: var(--wx-slider-track-border-radius);
		cursor: pointer;
		background: transparent;
	}

	input::-moz-range-thumb {
		margin-top: calc(
			(var(--wx-slider-track-height) - var(--wx-slider-thumb-size)) / 2
		);
		width: var(--wx-slider-thumb-size);
		height: var(--wx-slider-thumb-size);
		background: var(--wx-slider-primary);
		border: var(--wx-slider-thumb-border);
		border-radius: 50%;
		cursor: pointer;
		appearance: none;
	}

	input::-moz-range-progress {
		background-color: var(--wx-slider-primary);
		height: var(--wx-slider-track-height);
		border-top-left-radius: var(--wx-slider-track-border-radius);
		border-bottom-left-radius: var(--wx-slider-track-border-radius);
	}

	input::-ms-track {
		color: transparent;
		margin: 0;
		width: 100%;
		height: var(--wx-slider-track-height);
		border: none;
		border-radius: var(--wx-slider-track-border-radius);
		cursor: pointer;
		background: transparent;
	}

	input::-ms-fill-lower {
		background: var(--wx-slider-primary);
		border: 0.2px solid var(--wx-slider-primary);
		border-radius: var(--wx-slider-track-border-radius);
	}

	input::-ms-fill-upper {
		background: var(--wx-slider-background);
		border: 0.2px solid var(--wx-slider-background);
		border-radius: var(--wx-slider-track-border-radius);
	}

	input::-ms-thumb {
		margin-top: calc(
			(var(--wx-slider-track-height) - var(--wx-slider-thumb-size)) / 2
		);
		width: var(--wx-slider-thumb-size);
		height: var(--wx-slider-thumb-size);
		background: var(--wx-slider-primary);
		border: var(--wx-slider-thumb-border);
		border-radius: 50%;
		cursor: pointer;
		appearance: none;
	}

	input:focus::-ms-fill-lower {
		background: var(--wx-slider-primary);
	}

	input:focus::-ms-fill-upper {
		background: var(--wx-slider-background);
	}

	input[disabled] {
		cursor: not-allowed;
		background: var(--wx-color-disabled);
	}
	input[disabled]::-webkit-slider-runnable-track {
		cursor: not-allowed;
	}
	input[disabled]::-webkit-slider-thumb {
		cursor: not-allowed;
		background: var(--wx-background);
		border: var(--wx-slider-thumb-border-disabled);
	}
	input[disabled]::-moz-range-track {
		cursor: not-allowed;
	}
	input[disabled]::-moz-range-thumb {
		cursor: not-allowed;
		background: var(--wx-background);
		border: var(--wx-slider-thumb-border-disabled);
	}
	input[disabled]::-moz-range-progress {
		cursor: not-allowed;
		background: var(--wx-color-disabled);
	}
	input[disabled]::-ms-track {
		cursor: not-allowed;
	}
	input[disabled]::-ms-fill-lower {
		background: var(--wx-color-disabled);
		border-color: var(--wx-color-disabled);
	}
	input[disabled]::-ms-fill-upper {
		background: var(--wx-color-disabled);
		border-color: var(--wx-color-disabled);
	}
	input[disabled]::-ms-thumb {
		cursor: not-allowed;
		background: var(--wx-background);
		border: var(--wx-slider-thumb-border-disabled);
	}
	input[disabled]:focus::-ms-fill-lower {
		background: var(--wx-color-disabled);
	}
	input[disabled]:focus::-ms-fill-upper {
		background: var(--wx-color-disabled);
	}
</style>
