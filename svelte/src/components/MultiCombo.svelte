<script>
	import { createEventDispatcher } from "svelte";
	import List from "./helpers/SuggestDropdown.svelte";
	import Checkbox from "./Checkbox.svelte";

	export let value;
	export let options = [];
	export let textField = "label";
	export let placeholder = "";
	export let title = "";
	export let disabled = false;
	export let error = false;
	export let checkboxes = false;

	const dispatch = createEventDispatcher();

	let text = "";
	let selected = [];
	let filterOptions;
	let focus = false;

	$: filterOptions = options;

	let navigate;
	let keydown;
	function ready(ev) {
		navigate = ev.detail.navigate;
		keydown = ev.detail.keydown;
	}

	$: selected = value ? options.filter(i => value.includes(i.id)) : [];

	function input() {
		filterOptions = text
			? options.filter(i =>
					i[textField].toLowerCase().includes(text.toLowerCase())
				)
			: options;
		if (filterOptions.length) navigate(0);
		else navigate(null);
	}
	function select(ev) {
		const { id } = ev.detail;

		if (id) {
			let next;
			if (value) {
				if (value.includes(id)) {
					next = value.filter(i => i !== id);
				} else {
					next = [...value, id];
				}
			} else {
				next = [id];
			}

			value = next;
			selected = options.filter(i => value.includes(i.id));

			dispatch("select", { selected });
			dispatch("change", { value });
		}
	}

	function remove(id) {
		value = value.filter(i => i !== id);
		dispatch("change", { value });
	}

	const index = () =>
		value && value.length
			? filterOptions.findIndex(i => i.id === value[0])
			: 0;
</script>

<div
	{title}
	class="wx-multicombo"
	class:wx-error={error}
	class:wx-disabled={disabled}
	class:wx-not-empty={selected.length}
	class:wx-focus={focus && !disabled}
	on:click={() => !disabled && navigate(index())}
	on:keydown={ev => keydown(ev, index())}
>
	<div class="wx-wrapper">
		<div class="wx-tags">
			{#each selected as tag (tag.id)}
				<div class="wx-tag">
					<slot option={tag}>{tag[textField]}</slot>
					{#if !disabled}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<i
							class="wxi-close"
							on:click|stopPropagation={() => remove(tag.id)}
						/>
					{/if}
				</div>
			{/each}
		</div>
		<div class="wx-select">
			<input
				type="text"
				bind:value={text}
				on:input={input}
				{placeholder}
				{disabled}
			/>
			<i class="wx-icon wxi-angle-down" />
		</div>
	</div>

	{#if !disabled}
		<List
			let:option
			items={filterOptions}
			on:ready={ready}
			on:select={select}
		>
			{#if checkboxes}
				<Checkbox
					style="margin-right: 8px; pointer-events: none;"
					name={option.id}
					value={value && value.includes(option.id)}
				/>
			{/if}
			<slot {option}>{option.name}</slot>
		</List>
	{/if}
</div>

<style>
	.wx-multicombo {
		position: relative;
		width: var(--wx-input-width);
	}
	.wx-multicombo.wx-focus .wx-wrapper {
		border: var(--wx-input-border-focus);
	}
	.wx-multicombo.wx-disabled .wx-wrapper {
		border: var(--wx-input-border-disabled);
		background: var(--wx-input-background-disabled);
	}
	.wx-multicombo.wx-disabled .wx-tag {
		background: var(--wx-color-disabled);
		color: var(--wx-color-font-disabled);
	}
	.wx-multicombo:not(.wx-disabled) .wx-tag {
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
	}
	.wx-multicombo.wx-disabled input {
		cursor: not-allowed;
		color: var(--wx-color-font-disabled);
	}
	.wx-multicombo.wx-disabled .wx-icon {
		color: var(--wx-color-font-disabled);
	}
	.wx-multicombo.wx-error .wx-wrapper {
		border-color: var(--wx-color-danger);
	}
	.wx-multicombo.wx-error input {
		color: var(--wx-color-danger);
	}
	.wx-multicombo.wx-error .wx-icon {
		color: var(--wx-color-danger);
	}
	.wx-multicombo.wx-not-empty .wx-tags {
		gap: var(--wx-multicombo-tag-gap);
		padding: var(--wx-multicombo-tag-gap);
	}
	.wx-multicombo.wx-not-empty input {
		border-top: var(--wx-input-border);
	}
	.wx-multicombo.wx-not-empty.wx-focus input {
		border-top: var(--wx-input-border-focus);
	}
	.wx-multicombo.wx-not-empty.wx-disabled input {
		border-top: var(--wx-input-border-disabled);
	}
	.wx-multicombo.wx-not-empty.wx-error input {
		border-top-color: var(--wx-color-danger);
	}

	.wx-wrapper {
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-input-background);
	}

	.wx-tags {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		overflow: hidden;
	}

	.wx-tag {
		position: relative;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		border: var(--wx-multicombo-tag-border);
		border-radius: var(--wx-multicombo-tag-border-radius);
		background: var(--wx-multicombo-tag-background);
		padding: var(--wx-multicombo-tag-pading);
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
		color: var(--wx-color-primary);
	}

	.wx-select {
		position: relative;
	}

	input {
		display: block;
		width: 100%;
		height: var(--wx-input-height);
		outline: none;
		background: transparent;
		border: none;
		border-radius: 0;
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
</style>
