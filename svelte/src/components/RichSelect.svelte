<script>
	import List from "./helpers/SuggestDropdown.svelte";

	let {
		value = $bindable(""),
		options = [],
		textOptions = null,
		placeholder = "",
		disabled = false,
		error = false,
		title = "",
		textField = "label",
		clear = false,
		children: kids,
		onchange,
	} = $props();

	let navigate;
	let keydown;
	function ready(ev) {
		navigate = ev.navigate;
		keydown = ev.keydown;
	}

	let selected = $derived(
		value || value === 0
			? (textOptions || options).find(a => a.id === value)
			: null
	);

	function select({ id }) {
		if (id || id === 0) {
			value = id;

			navigate(null);
			onchange && onchange({ value });
		}
	}

	function unselect(ev) {
		ev.stopPropagation();
		value = "";
		onchange && onchange({ value });
	}

	const index = () => options.findIndex(a => a.id === value);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="wx-richselect"
	{title}
	class:wx-error={error}
	class:wx-disabled={disabled}
	class:wx-nowrap={!kids}
	onclick={() => navigate?.(index())}
	onkeydown={ev => keydown?.(ev, index())}
	tabindex="0"
>
	<div class="wx-label">
		{#if selected}
			{#if kids}{@render kids(selected)}{:else}{selected[textField]}{/if}
		{:else if placeholder}
			<span class="wx-placeholder">{placeholder}</span>
		{:else}&nbsp;{/if}
	</div>

	{#if clear && !disabled && value}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i class="wx-icon wxi-close" onclick={unselect}></i>
	{:else}<i class="wx-icon wxi-angle-down"></i>{/if}

	{#if !disabled}
		<List items={options} onready={ready} onselect={select}>
			{#snippet children({ option })}
				{#if kids}{@render kids(option)}{:else}{option[textField]}{/if}
			{/snippet}
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
	.wx-icon.wxi-close {
		pointer-events: all;
	}
	.wx-icon.wxi-close:hover {
		background: var(--wx-background-hover);
		border-radius: var(--wx-icon-border-radius);
	}

	.wx-nowrap .wx-label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
