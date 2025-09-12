<script>
	import { uid } from "@svar-ui/lib-dom";

	let {
		id = uid(),
		value = $bindable(0),
		step = 1,
		min = 0,
		max = Infinity,
		error = false,
		disabled = false,
		readonly = false,
		onchange,
	} = $props();

	function dec() {
		if (readonly || value <= min) return;
		value -= step;
		onchange && onchange({ value });
	}

	function inc() {
		if (readonly || value >= max) return;
		value += step;
		onchange && onchange({ value });
	}

	function blur() {
		if (!readonly) {
			const tValue =
				Math.round(Math.min(max, Math.max(value, min)) / step) * step;
			value = isNaN(tValue) ? Math.max(min, 0) : tValue;
			onchange && onchange({ value });
		}
	}

	function input(e) {
		onchange && onchange({ value: e.target.value * 1, input: true });
	}
</script>

<div
	class="wx-counter"
	class:wx-disabled={disabled}
	class:wx-readonly={readonly}
	class:wx-error={error}
>
	<button aria-label="-" class="wx-btn wx-btn-dec" {disabled} onclick={dec}>
		<svg
			class="wx-dec"
			width="12"
			height="2"
			viewBox="0 0 12 2"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M11.2501 1.74994H0.750092V0.249939H11.2501V1.74994Z" />
		</svg>
	</button>
	<input
		{id}
		type="text"
		class="wx-input"
		{disabled}
		{readonly}
		required
		bind:value
		onblur={blur}
		oninput={input}
	/>
	<button aria-label="-" class="wx-btn wx-btn-inc" {disabled} onclick={inc}>
		<svg
			class="wx-inc"
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11.2501
                6.74994H6.75009V11.2499H5.25009V6.74994H0.750092V5.24994H5.25009V0.749939H6.75009V5.24994H11.2501V6.74994Z"
			/>
		</svg>
	</button>
</div>

<style>
	.wx-counter {
		display: flex;
		border: var(--wx-input-border);
		width: max-content;
		border-radius: var(--wx-input-border-radius);
	}

	.wx-counter:not(:global(.wx-readonly)):has(:global(.wx-input:focus)) {
		border: var(--wx-input-border-focus);
	}

	.wx-input {
		box-sizing: border-box;
		background: var(--wx-background);
		width: 40px;
		height: 30px;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		color: var(--wx-input-font-color);
		padding-left: 8px;
		padding-right: 8px;
		outline: none;
		border: none;
		border-left: var(--wx-input-border);
		border-right: var(--wx-input-border);
	}

	.wx-btn {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 32px;
		height: 30px;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		color: var(--wx-input-font-color);
		background-color: var(--wx-background-alt);
		outline: none;
		border: none;
		cursor: pointer;
	}

	.wx-counter:not(:global(.wx-readonly)):not(:global(.wx-disabled))
		.wx-btn:active {
		background-color: var(--wx-background-hover);
	}

	.wx-dec,
	.wx-inc {
		fill: var(--wx-color-primary);
	}

	.wx-btn-dec {
		border-radius: 2px 0 0 2px;
	}
	.wx-btn-inc {
		border-radius: 0 2px 2px 0;
	}

	.wx-error,
	.wx-counter.wx-error:has(:global(.wx-input:focus)) {
		border: 1px solid var(--wx-color-danger);
	}

	.wx-error .wx-input {
		color: var(--wx-color-danger);
	}

	.wx-disabled .wx-input,
	.wx-disabled .wx-btn {
		cursor: not-allowed;
		color: var(--wx-color-font-disabled);
	}

	.wx-disabled .wx-btn {
		background: var(--wx-color-disabled-alt);
	}

	.wx-disabled .wx-btn .wx-dec,
	.wx-disabled .wx-btn .wx-inc,
	.wx-readonly .wx-btn .wx-dec,
	.wx-readonly .wx-btn .wx-inc {
		fill: var(--wx-color-font-disabled);
	}

	.wx-readonly .wx-btn {
		cursor: default;
	}
</style>
