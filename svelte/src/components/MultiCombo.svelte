<script>
	import { uid } from "@svar-ui/lib-dom";
	import List from "./helpers/SuggestDropdown.svelte";
	import Checkbox from "./Checkbox.svelte";

	let {
		id = uid(),
		value = $bindable([]),
		options = [],
		textOptions = null,
		textField = "label",
		placeholder = "",
		title = "",
		disabled = false,
		error = false,
		checkboxes = false,
		onchange,
		children,
	} = $props();

	let text = $state("");
	let selected = $derived(
		value ? (textOptions || options).filter(i => value.includes(i.id)) : []
	);
	let filterOptions = $derived.by(() => {
		const o = options;
		return text
			? o.filter(i =>
					i[textField].toLowerCase().includes(text.toLowerCase())
				)
			: o;
	});
	let focus = $state(false);
	let inputElement = $state();

	let navigate = null;
	let keydown = null;
	function onready(ev) {
		navigate = ev.navigate;
		keydown = ev.keydown;
	}

	function input() {
		if (filterOptions.length) navigate(0);
		else navigate(null);
	}
	function onselect(ev) {
		const { id } = ev;

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
			onchange && onchange({ value });

			inputElement.focus();
		}
	}

	function remove(id, ev) {
		if (ev) ev.stopPropagation();

		value = value.filter(i => i !== id);
		onchange && onchange({ value });
	}

	const index = () =>
		value && value.length
			? filterOptions.findIndex(i => i.id === value[0])
			: 0;

	function onclick() {
		if (!disabled) {
			inputElement.focus();
			navigate(index());
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	{title}
	class="wx-multicombo"
	class:wx-error={error}
	class:wx-disabled={disabled}
	class:wx-not-empty={selected.length}
	class:wx-focus={focus && !disabled}
	{onclick}
	onkeydown={ev => keydown(ev, index())}
>
	<div class="wx-wrapper">
		<div class="wx-tags">
			{#each selected as tag (tag.id)}
				<div class="wx-tag">
					{#if children}{@render children({
							option: tag,
						})}{:else}{tag[textField]}{/if}
					{#if !disabled}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<i
							class="wx-icon wxi-close"
							onclick={ev => remove(tag.id, ev)}
						></i>
					{/if}
				</div>
			{/each}
		</div>
		<div class="wx-select">
			<input
				{id}
				type="text"
				bind:this={inputElement}
				bind:value={text}
				oninput={input}
				{placeholder}
				{disabled}
				onfocus={() => (focus = true)}
				onblur={() => (focus = false)}
			/>
			<i class="wx-icon wxi-angle-down"></i>
		</div>
	</div>

	{#if !disabled}
		<List items={filterOptions} {onready} {onselect}>
			{#snippet children({ option })}
				{#if checkboxes}
					<Checkbox
						style="margin-right: 8px; pointer-events: none;"
						name={option.id}
						value={value && value.includes(option.id)}
					/>
				{/if}
				{#if children}{@render children({
						option,
					})}{:else}{option[textField]}{/if}
			{/snippet}
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
	.wx-multicombo:not(:global(.wx-disabled)) .wx-tag {
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
	}
	.wx-multicombo.wx-disabled input {
		cursor: not-allowed;
		color: var(--wx-color-font-disabled);
	}
	.wx-multicombo.wx-disabled .wx-icon.wxi-angle-down {
		color: var(--wx-color-font-disabled);
	}
	.wx-multicombo.wx-error .wx-wrapper {
		border-color: var(--wx-color-danger);
	}
	.wx-multicombo.wx-error input {
		color: var(--wx-color-danger);
	}
	.wx-multicombo.wx-error .wx-icon.wxi-angle-down {
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
	.wx-icon {
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
		pointer-events: none;
		user-select: none;
		color: var(--wx-input-icon-color);
	}
	.wx-icon:before {
		display: block;
	}

	.wxi-close {
		pointer-events: all;
		cursor: pointer;
	}
	.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
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
</style>
