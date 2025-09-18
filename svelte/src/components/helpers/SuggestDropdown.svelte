<script>
	import { onMount, getContext } from "svelte";
	import { getListHandlers } from "./listnav";
	import Dropdown from "../Dropdown.svelte";
	import { defaultLocale } from "./locale";

	let { items = [], children, onselect, onready } = $props();

	let list = $state();
	let navIndex = $state(null);

	const _ = (getContext("wx-i18n") || defaultLocale()).getGroup("core");

	const { move, keydown, init, navigate } = getListHandlers();

	const selectItem = ev => {
		if (ev) ev.stopPropagation();
		onselect && onselect({ id: items[navIndex]?.id });
	};

	$effect(() => {
		init(list, items, i => (navIndex = i), selectItem);
	});
	onMount(() => {
		onready && onready({ navigate, keydown, move });
	});
</script>

{#if navIndex !== null}
	<Dropdown oncancel={() => navigate(null)}>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="wx-list"
			bind:this={list}
			onclick={selectItem}
			onmousemove={move}
		>
			{#if items.length}
				{#each items as data, index (data.id)}
					<div
						class="wx-item"
						class:wx-focus={index === navIndex}
						data-id={data.id}
					>
						{#if children}{@render children({
								option: data,
							})}{:else}{data.label}{/if}
					</div>
				{/each}
			{:else}
				<div class="wx-no-data">{_("No data")}</div>
			{/if}
		</div>
	</Dropdown>
{/if}

<style>
	.wx-list {
		max-height: 250px;
		overflow-y: auto;
	}

	.wx-item {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		color: var(--wx-input-font-color);
		padding: var(--wx-input-padding);
		cursor: pointer;
	}
	/* .item.selected {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	} */
	.wx-item.wx-focus {
		background: var(--wx-background-hover);
	}
	/* .item.selected.navigate {
		background: var(--wx-color-primary-hover);
	} */
	.wx-no-data {
		padding: var(--wx-input-padding);
	}
</style>
