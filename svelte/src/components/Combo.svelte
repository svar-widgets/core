<script>
	import List from "./helpers/SuggestDropdown.svelte";
	import { uid } from "@svar-ui/lib-dom";

	let {
		value = $bindable(""),
		id = uid(),
		options = [],
		textOptions = null,
		textField = "label",
		placeholder = "",
		title = "",
		disabled = false,
		error = false,
		clear = false,
		children: kids,
		onchange,
	} = $props();

	let filterActive = $state(false);
	let textInput = $state("");

	let text = $derived.by(() => {
		if (filterActive) return textInput;
		if (value || value === 0) {
			const option = (textOptions || options).find(a => a.id === value);
			if (option) return option[textField];
		}
		return "";
	});

	let filteredOptions = $derived.by(() => {
		if (!text || !filterActive) return options;

		return options.filter(i =>
			i[textField].toLowerCase().includes(text.toLowerCase())
		);
	});

	let navigate, keydown;
	function ready(ev) {
		navigate = ev.navigate;
		keydown = ev.keydown;
	}
	const index = () => filteredOptions.findIndex(a => a.id === value);
	const onclick = () => navigate(index());
	const onkeydown = e => keydown(e, index());

	function selectByEvent({ id }) {
		doSelect(id, true);
	}

	function selectByText(chunk) {
		if (!options.length) return;
		if (chunk === "" && clear) {
			doUnselect();
			return;
		}

		let res = options.find(i => i[textField] === chunk);
		if (!res) {
			res = options.find(i =>
				i[textField].toLowerCase().includes(chunk.toLowerCase())
			);
		}

		const id = res ? res.id : value || options[0].id;
		doSelect(id, false);
	}

	function doSelect(id, effects) {
		if (id || id === 0) {
			let selected = options.find(a => a.id === id);
			filterActive = false;

			if (effects) navigate(null);

			if (selected && value !== selected.id) {
				value = selected.id;
				onchange && onchange({ value });
			}
		}

		if (!hasFocus && effects) inputElement.focus();
	}

	function doUnselect(ev) {
		if (ev) ev.stopPropagation();

		value = "";
		filterActive = false;
		onchange && onchange({ value });
	}

	function oninput() {
		textInput = inputElement.value;
		filterActive = true;

		if (filteredOptions.length) navigate(0);
		else navigate(null);
	}

	let inputElement, hasFocus;
	function onfocus() {
		hasFocus = true;
	}
	function onblur() {
		hasFocus = false;
		setTimeout(() => {
			if (!hasFocus) selectByText(text);
		}, 200);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="wx-combo" {onclick} {onkeydown} {title}>
	<input
		{id}
		bind:this={inputElement}
		value={text}
		class:wx-error={error}
		{disabled}
		{placeholder}
		{onfocus}
		{onblur}
		{oninput}
	/>

	{#if clear && !disabled && value}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i class="wx-icon wxi-close" onclick={doUnselect}></i>
	{:else}<i class="wx-icon wxi-angle-down"></i>{/if}

	{#if !disabled}
		<List items={filteredOptions} onready={ready} onselect={selectByEvent}>
			{#snippet children({ option })}
				{#if kids}{@render kids({ option })}{:else}{option[
						textField
					]}{/if}
			{/snippet}
		</List>
	{/if}
</div>

<style>
	.wx-combo {
		position: relative;
		width: var(--wx-input-width);
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
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: pointer;
	}
	input:focus {
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
	input[disabled] ~ .wx-icon {
		color: var(--wx-color-font-disabled);
	}
	input.wx-error {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}
	input.wx-error ~ .wx-icon {
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

	.wx-icon.wxi-close {
		pointer-events: all;
		cursor: pointer;
	}

	.wx-icon.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}
</style>
