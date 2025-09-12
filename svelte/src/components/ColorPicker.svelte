<script>
	import { uid } from "@svar-ui/lib-dom";
	import Dropdown from "./Dropdown.svelte";
	import ColorBoard from "./ColorBoard.svelte";

	let {
		value = $bindable(""),
		id = uid(),
		placeholder = "",
		title = "",
		disabled = false,
		error = false,
		clear = false,
		onchange,
	} = $props();

	let popup = $state(false);

	function handlePopup() {
		if (disabled) return false;
		popup = true;
	}

	function selectColor(ev) {
		if (ev.input) return;

		popup = false;
		value = ev.value;
		onchange && onchange({ value });
	}

	function unselectColor(ev) {
		ev.stopPropagation();
		value = "";
		onchange && onchange({ value });
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="wx-colorpicker" onclick={handlePopup}>
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
	<div class="wx-color" style="background: {value}"></div>

	{#if clear && !disabled && value}
		<i class="wxi-close" onclick={unselectColor}></i>
	{/if}

	{#if popup}
		<Dropdown oncancel={() => (popup = false)}>
			<ColorBoard {value} button="true" onchange={selectColor} />
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

	.wxi-close {
		position: absolute;
		right: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
		font-size: var(--wx-input-icon-size);
		line-height: 1;
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
		color: var(--wx-input-icon-color);
		cursor: pointer;
	}
	.wxi-close:before {
		display: block;
	}
	.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}
</style>
