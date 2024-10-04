<script>
	import { uid } from "wx-lib-dom";
	import Dropdown from "./Dropdown.svelte";
	import ColorBoard from "./ColorBoard.svelte";

	export let value = "";
	export let id = uid();
	export let placeholder = "";
	export let title = "";
	export let disabled = false;
	export let error = false;

	let popup;

	function handlePopup() {
		if (disabled) return false;
		popup = true;
	}

	function selectColor(ev) {
		value = ev.detail.value;
		popup = null;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="wx-colorpicker" on:click={handlePopup}>
	<input
		{title}
		{value}
		readonly
		{id}
		{placeholder}
		{disabled}
		class:wx-error={error}
		class:wx-focus={popup}
	/>
	<div class="wx-color" style="background: {value}" />

	{#if popup}
		<Dropdown cancel={() => (popup = null)}>
			<ColorBoard {value} button="true" on:change={selectColor} />
		</Dropdown>
	{/if}
</div>

<style>
	.wx-colorpicker {
		position: relative;
		width: var(--wx-input-width);
	}

	.wx-color {
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border-radius: var(--wx-input-border-radius);
		cursor: pointer;
		position: absolute;
		left: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
	}

	input {
		display: block;
		width: 100%;
		height: var(--wx-input-height);
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
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
		padding-left: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
		overflow: hidden;
		text-overflow: ellipsis;
	}
	input.wx-focus {
		border: var(--wx-input-border-focus);
	}
	input::placeholder {
		color: var(--wx-input-placeholder-color);
	}
	input[disabled] {
		cursor: not-allowed;
		border: var(--wx-input-border-disabled);
		color: var(--wx-color-font-disabled);
		background: var(--wx-input-background-disabled);
	}
	input[disabled]::placeholder {
		color: var(--wx-color-font-disabled);
	}
	input[disabled] ~ .wx-color {
		cursor: not-allowed;
	}
	input.wx-error {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}
</style>
