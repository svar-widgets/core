<script>
	import { createEventDispatcher } from "svelte";
	import { uid } from "@wx/lib-dom";

	export let value = 0;
	export let step = 1;
	export let min = 0;
	export let max = Infinity;
	export let error = false;
	export let disabled = false;
	export let readonly = false;

	const dispatch = createEventDispatcher();

	function dec() {
		if (readonly || value <= min) return;
		value -= step;
		dispatch("change", { value });
	}

	function inc() {
		if (readonly || value >= max) return;
		value += step;
		dispatch("change", { value });
	}

	function blur() {
		if (!readonly) {
			const tValue =
				Math.round(Math.min(max, Math.max(value, min)) / step) * step;
			value = isNaN(tValue) ? Math.max(min, 0) : tValue;
			dispatch("change", { value });
		}
	}

	function input(e) {
		dispatch("change", { value: e.target.value * 1, input: true });
	}

	const id = uid();
</script>

<div
	class="wx-counter"
	class:wx-disabled={disabled}
	class:wx-readonly={readonly}
	class:wx-error={error}
>
	<button class="wx-btn wx-btn-dec" {disabled} on:click={dec}>
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
		on:blur={blur}
		on:input={input}
	/>
	<button class="wx-btn wx-btn-inc" {disabled} on:click={inc}>
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

	.wx-counter:not(.wx-readonly):has(.wx-input:focus) {
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

	.wx-counter:not(.wx-readonly):not(.wx-disabled) .wx-btn:active {
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
	.wx-counter.wx-error:has(.wx-input:focus) {
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
