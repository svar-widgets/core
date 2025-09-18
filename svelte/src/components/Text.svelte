<script>
	import { uid } from "@svar-ui/lib-dom";
	import { onMount } from "svelte";

	let {
		value = $bindable(""),
		id = uid(),
		readonly = false,
		focus = false,
		select = false,
		type = "text",
		placeholder = "",
		disabled = false,
		error = false,
		inputStyle = "",
		title = "",
		css = "",
		icon = "",
		clear = false,
		onchange,
	} = $props();

	let cssString = $derived(
		icon && css.indexOf("wx-icon-left") === -1
			? "wx-icon-right " + css
			: css
	);
	let hasLeftIcon = $derived(icon && css.indexOf("wx-icon-left") !== -1);

	// svelte-ignore non_reactive_update
	let input;
	onMount(() => {
		// wait till the source click processing will end
		setTimeout(() => {
			if (focus && input) input.focus();
			if (select && input) input.select();
		}, 1);
	});

	const oninput = () => onchange && onchange({ value, input: true });
	const change = () => onchange && onchange({ value });

	function clearValue(ev) {
		ev.stopPropagation();
		value = "";
		onchange && onchange({ value });
	}
</script>

<div
	class="wx-text {cssString}"
	class:wx-error={error}
	class:wx-disabled={disabled}
	class:wx-clear={clear}
>
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
			{oninput}
			onchange={change}
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
			{oninput}
			onchange={change}
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
			{oninput}
			onchange={change}
		/>
	{/if}

	{#if clear && !disabled && value}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i class="wx-icon wxi-close" onclick={clearValue}></i>
		{#if hasLeftIcon}<i class="wx-icon {icon}"></i>{/if}
	{:else if icon}<i class="wx-icon {icon}"></i>{/if}
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

	.wx-icon-left .wx-icon:not(.wxi-close) {
		right: auto;
		left: var(--wx-input-icon-indent);
	}

	.wx-icon.wxi-close {
		pointer-events: all;
		cursor: pointer;
	}
	.wx-icon.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
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
	.wx-icon-right input,
	.wx-text.wx-clear input {
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
</style>
