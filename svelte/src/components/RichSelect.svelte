<script>
	import { createEventDispatcher } from "svelte";
	import List from "./helpers/SuggestDropdown.svelte";

	export let value = "";
	export let options = [];
	export let placeholder = "Click to select";
	export let disabled = false;
	export let error = false;
	export let title = "";

	const dispatch = createEventDispatcher();
	const SLOTS = $$props.$$slots;

	let selected = null;
	let navigate;
	let keydown;
	function ready(ev) {
		navigate = ev.detail.navigate;
		keydown = ev.detail.keydown;
	}

	$: selected =
		value || value === 0 ? options.find(a => a.id === value) : null;

	function select(ev) {
		const { id } = ev.detail;

		if (id || id === 0) {
			value = id;
			const obj = options.find(a => a.id === id);

			navigate(null);
			dispatch("select", { selected: obj });
		}
	}

	const index = () => options.findIndex(a => a.id === value);
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	class="wx-richselect"
	{title}
	class:wx-error={error}
	class:wx-disabled={disabled}
	class:wx-nowrap={!SLOTS}
	on:click={() => navigate(index())}
	on:keydown={ev => keydown(ev, index())}
	tabindex="0"
>
	<div class="wx-label">
		{#if selected}
			<slot option={selected}>{selected.name || ""}</slot>
		{:else if placeholder}
			<span class="wx-placeholder">{placeholder}</span>
		{:else}&nbsp;{/if}
	</div>

	<i class="wx-icon wxi-angle-down" />

	{#if !disabled}
		<List let:option items={options} on:ready={ready} on:select={select}>
			<slot {option}>{option.name}</slot>
		</List>
	{/if}
</div>

<style>
	.wx-richselect {
		position: relative;
		outline: none;
		width: var(--wx-input-width);
		min-height: var(--wx-input-height);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-input-background);
		cursor: pointer;
	}
	.wx-richselect:focus {
		border: var(--wx-input-border-focus);
	}
	.wx-richselect.wx-disabled {
		cursor: not-allowed;
		border: var(--wx-input-border-disabled);
		background: var(--wx-input-background-disabled);
	}
	.wx-richselect.wx-disabled .wx-label {
		color: var(--wx-color-font-disabled);
	}
	.wx-richselect.wx-disabled .wx-icon {
		color: var(--wx-color-font-disabled);
	}
	.wx-richselect.wx-error {
		border-color: var(--wx-color-danger);
	}
	.wx-richselect.wx-error .wx-label {
		color: var(--wx-color-danger);
	}
	.wx-richselect.wx-error .wx-icon {
		color: var(--wx-color-danger);
	}

	.wx-label {
		display: block;
		width: 100%;
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
	}

	.wx-placeholder {
		color: var(--wx-input-placeholder-color);
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

	.wx-nowrap .wx-label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
