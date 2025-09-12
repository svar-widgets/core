<script>
	import { uid } from "@svar-ui/lib-dom";
	import Dropdown from "./Dropdown.svelte";

	const defaultColors = [
		"#00a037",
		"#37a9ef",
		"#f5a623",
		"#ff4c3b",
		"#a0a0a0",
		"#000000",
		"#ffffff",
	];

	let {
		colors = defaultColors,
		value = $bindable(""),
		id = uid(),
		clear = false,
		placeholder = "",
		title = "",
		disabled = false,
		error = false,
		onchange,
	} = $props();

	let popup = $state(false);

	function selectColor(ev, color) {
		ev.stopPropagation();
		value = color;
		popup = false;
		onchange && onchange({ value });
	}
	function unselectColor(ev) {
		ev.stopPropagation();
		value = "";
		onchange && onchange({ value });
	}
	function handlePopup() {
		if (disabled) return false;
		popup = true;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="wx-colorselect" onclick={handlePopup}>
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

	{#if clear && value && !disabled}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i class="wx-clear wxi-close" onclick={unselectColor}></i>
	{/if}

	{#if value}
		<div
			class="wx-color wx-selected"
			style="background-color: {value || '#00a037'}"
		></div>
	{:else}
		<div class="wx-empty wx-selected"></div>
	{/if}

	{#if popup}
		<Dropdown oncancel={() => (popup = false)}>
			<div class="wx-colors">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="wx-empty" onclick={ev => selectColor(ev, "")}></div>
				{#each colors as color}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="wx-color"
						style="background-color: {color}"
						onclick={ev => selectColor(ev, color)}
					></div>
				{/each}
			</div>
		</Dropdown>
	{/if}
</div>

<style>
	.wx-colorselect {
		position: relative;
		width: var(--wx-input-width);
	}

	.wx-selected {
		position: absolute;
		left: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
	}

	.wx-colors {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 8px;
	}

	.wx-color {
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border-radius: var(--wx-input-border-radius);
		cursor: pointer;
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
	input[disabled] ~ .wx-color,
	input[disabled] ~ .wx-empty {
		cursor: not-allowed;
	}
	input.wx-error {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}

	.wx-empty {
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: linear-gradient(
			to top left,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0) calc(50% - 1px),
			rgb(255, 0, 0) 50%,
			rgba(0, 0, 0, 0) calc(50% + 1px),
			rgba(0, 0, 0, 0) 100%
		);
		cursor: pointer;
		user-select: none;
	}

	.wxi-close {
		position: absolute;
		right: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
		font-size: var(--wx-input-icon-size);
		line-height: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		border-radius: var(--wx-input-border-radius);
		color: var(--wx-input-icon-color);
		cursor: pointer;
	}
	.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}
</style>
