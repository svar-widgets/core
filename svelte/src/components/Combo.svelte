<script>
	import { createEventDispatcher } from "svelte";
	import List from "./helpers/SuggestDropdown.svelte";
	import { uid } from "wx-lib-dom";

	export let value = "";
	export let id = uid();
	export let options = [];
	export let textField = "label";
	export let placeholder = "";
	export let title = "";
	export let disabled = false;
	export let error = false;
	export let clearButton = false;

	const dispatch = createEventDispatcher();

	let text = "";
	let filterOptions = [];

	let navigate;
	let keydown;
	function ready(ev) {
		navigate = ev.detail.navigate;
		keydown = ev.detail.keydown;
	}

	let prevValue;
	$: {
		if (prevValue != value) {
			text =
				value || value === 0
					? options.find(a => a.id === value)[textField]
					: "";
			prevValue = value;
		}
	}
	$: filterOptions = options;

	function selectByEvent(ev) {
		const id = ev.detail.id;
		doSelect(id, true);
	}

	function selectByText(text) {
		if (!options.length) return;
		if (text === "" && clearButton) {
			doUnselect();
			return;
		}

		let res = options.find(i => i[textField] === text);
		if (!res) {
			res = options.find(i =>
				i[textField].toLowerCase().includes(text.toLowerCase())
			);
		}

		const id = res ? res.id : prevValue || options[0].id;
		doSelect(id, false);
	}

	function doSelect(id, effects) {
		if (id || id === 0) {
			let selected = options.find(a => a.id === id);
			text = selected[textField];
			filterOptions = options;

			if (effects) navigate(null);

			if (value !== selected.id) {
				value = selected.id;
				dispatch("select", { selected });
			}
		}

		if (!hasFocus && effects) inputElement.focus();
	}

	function doUnselect() {
		text = value = "";
		filterOptions = options;
		dispatch("select", { selected: null });
	}

	function input() {
		filterOptions = text
			? options.filter(i =>
					i[textField].toLowerCase().includes(text.toLowerCase())
				)
			: options;
		if (filterOptions.length) navigate(0);
		else navigate(null);
	}

	let inputElement,
		hasFocus,
		blurTimer = null;
	function onFocus() {
		hasFocus = true;
	}
	function onBlur() {
		hasFocus = false;
		blurTimer = setTimeout(() => {
			if (!hasFocus) selectByText(text);
		}, 200);
	}

	const index = () => filterOptions.findIndex(a => a.id === value);
</script>

<div
	class="wx-combo"
	on:click={() => navigate(index())}
	on:keydown={e => keydown(e, index())}
	{title}
>
	<input
		{id}
		bind:this={inputElement}
		bind:value={text}
		class:wx-error={error}
		{disabled}
		{placeholder}
		on:focus={onFocus}
		on:blur={onBlur}
		on:input={input}
	/>

	{#if clearButton && !disabled && value}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i class="wx-icon wxi-close" on:click|stopPropagation={doUnselect} />
	{:else}<i class="wx-icon wxi-angle-down" />{/if}

	{#if !disabled}
		<List
			let:option
			items={filterOptions}
			on:ready={ready}
			on:select={selectByEvent}
		>
			<slot {option}>{option.name}</slot>
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
	}

	.wx-icon.wxi-close:hover {
		color: var(--wx-color-danger);
	}
</style>
