<script>
	import { uid } from "wx-lib-dom";
	import { onMount, createEventDispatcher } from "svelte";

	export let value = "";
	export let id = uid();
	export let readonly = false;
	export let focus = false;
	export let select = false;
	export let type = "text";
	export let placeholder = "";
	export let disabled = false;
	export let error = false;
	export let inputStyle = "";
	export let title = "";
	export let css = "";
	export let icon = "";

	const dispatch = createEventDispatcher();

	if (icon && css.indexOf("wx-icon-left") === -1)
		css = "wx-icon-right " + css;

	let input;
	onMount(() => {
		// wait till the source click processing will end
		setTimeout(() => {
			if (focus && input) input.focus();
			if (select && input) input.select();
		}, 1);
	});
</script>

<div class="wx-text {css}" class:wx-error={error} class:wx-disabled={disabled}>
	{#if type == "password"}
		<input
			bind:value
			bind:this={input}
			{id}
			{readonly}
			{disabled}
			{placeholder}
			type="password"
			style={inputStyle}
			{title}
			on:input={() => dispatch("change", { value, input: true })}
			on:change={() => dispatch("change", { value })}
		/>
	{:else if type == "number"}
		<input
			bind:value
			bind:this={input}
			{id}
			{readonly}
			{disabled}
			{placeholder}
			type="number"
			style={inputStyle}
			{title}
			on:input={() => dispatch("change", { value, input: true })}
			on:change={() => dispatch("change", { value })}
		/>
	{:else}
		<input
			bind:value
			bind:this={input}
			{id}
			{readonly}
			{disabled}
			{placeholder}
			{title}
			style={inputStyle}
			on:input={() => dispatch("change", { value, input: true })}
			on:change={() => dispatch("change", { value })}
		/>
	{/if}

	{#if icon}<i class="wx-icon {icon}" />{/if}
</div>

<style>
	.wx-text {
		position: relative;
		width: var(--wx-input-width);
	}
	.wx-text.wx-disabled .wx-icon {
		color: var(--wx-color-font-disabled);
	}
	.wx-text.wx-error .wx-icon {
		color: var(--wx-color-danger);
	}
	.wx-icon {
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
		pointer-events: none;
		user-select: none;
		color: var(--wx-input-icon-color);
	}
	.wx-icon:before {
		display: block;
	}

	.wx-icon-left .wx-icon {
		right: auto;
		left: var(--wx-input-icon-indent);
	}

	input {
		display: block;
		width: var(--wx-input-width);
		height: var(--wx-input-height);
		max-width: 100%;
		padding: var(--wx-input-padding);
		outline: none;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-input-background);
		overflow: hidden;
		text-overflow: ellipsis;
	}
	input:focus {
		border: var(--wx-input-border-focus);
	}
	input::placeholder {
		color: var(--wx-input-placeholder-color);
	}

	.wx-icon-left input {
		padding-left: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
	}
	.wx-icon-right input {
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
	}

	input[disabled] {
		cursor: not-allowed !important;
		border: var(--wx-input-border-disabled);
		color: var(--wx-color-font-disabled);
		background: var(--wx-input-background-disabled);
		pointer-events: none;
	}
	input[disabled]::placeholder {
		color: var(--wx-color-font-disabled);
	}

	.wx-error input {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}

	.wx-title input {
		border: 1px solid transparent;
		font-weight: var(--wx-font-weight-md);
		font-size: var(--wx-font-size-md);
		line-height: var(--wx-line-height-md);
		color: var(--wx-color-secondary-font);
		margin-left: -8px;
		width: calc(100% + 8px);
	}
	.wx-title:focus:not([disabled]) input {
		border: var(--wx-input-border-focus);
	}
	.wx-title:hover:not([disabled]) input {
		border: var(--wx-input-border-focus);
	}
</style>
