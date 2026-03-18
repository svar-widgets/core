<script>
	import { onMount, getContext, tick } from "svelte";
	import { getListHandlers } from "./listnav.js";
	import Dropdown from "../Dropdown.svelte";
	import { defaultLocale } from "./locale";
	import { setID } from "@svar-ui/lib-dom";
	import Checkbox from "../Checkbox.svelte";

	let {
		items = [],
		children,
		onselect,
		onready,
		virtualized = false,
		checkboxes,
		multiselect,
		value,
		...rest
	} = $props();

	const overscan = 3;
	let list = $state();
	let firstItem = $state();

	let navIndex = $state(null);
	let scrollTop = $state(0);
	let itemHeight = $state(24);
	let isItemHeightInitialized = false;

	const _ = (getContext("wx-i18n") || defaultLocale()).getGroup("core");

	const { move, keydown, init, navigate } = getListHandlers();

	const scrollToVirtualized = navIndex => {
		if (list) {
			list.scrollTop =
				navIndex * itemHeight - list.clientHeight + itemHeight;
			scrollTop = list.scrollTop;
		}
	};
	const navigateVirtualized = (dir, ev) => {
		navigate(dir, ev);
		tick().then(() => {
			scrollToVirtualized(navIndex);
		});
	};

	const keydownVirtualized = (ev, dir) => {
		if (
			navIndex !== 0 &&
			navIndex !== items.length - 1 &&
			(ev.key == "ArrowDown" || ev.key == "ArrowUp")
		)
			ev.preventDefault();
		keydown(ev, dir);

		tick().then(() => {
			if (list) {
				const isInRange = visibleItems.find(
					item => item.id === navIndex
				);
				if (isInRange) {
					const isTargetVisibleTop =
						list.scrollTop <= navIndex * itemHeight;
					const isTargetVisibleBottom =
						list.scrollTop + list.clientHeight >=
						navIndex * itemHeight + itemHeight;

					if (!isTargetVisibleTop) {
						list.scrollTop = navIndex * itemHeight;
						scrollTop = list.scrollTop;
					} else if (!isTargetVisibleBottom) {
						scrollToVirtualized(navIndex);
					}
				} else {
					scrollToVirtualized(navIndex);
				}
			}
		});
	};

	const selectItem = ev => {
		if (ev) ev.stopPropagation();
		let nextValue;
		const nextId = items[navIndex]?.id;
		if (multiselect) {
			if (value.includes(nextId)) {
				nextValue = value.filter(i => i !== nextId);
			} else {
				nextValue = [...value, nextId];
			}
		} else {
			nextValue = nextId;
		}
		onselect && onselect({ id: nextValue });
	};

	const displayedItemsCount = $derived.by(() =>
		Math.ceil(list?.clientHeight / itemHeight)
	);

	const visibleRange = $derived.by(() => {
		if (!virtualized) return { start: 0, end: items.length };

		if (!items.length) return { start: 0, end: 0 };

		const start = Math.floor(scrollTop / itemHeight);
		const end = start + displayedItemsCount;

		return {
			start: Math.max(0, start - overscan),
			end: Math.min(items.length, end + overscan),
		};
	});

	const visibleItems = $derived.by(() => {
		if (!virtualized) return items;

		const { start, end } = visibleRange;
		return items.slice(start, end).map(item => ({
			...item,
		}));
	});

	const offsetTop = $derived(visibleRange.start * itemHeight);
	const totalHeight = $derived(items.length * itemHeight);

	const handleScroll = ev => {
		if (virtualized) {
			scrollTop = ev.target.scrollTop;
		}
	};

	$effect(() => {
		if (!isItemHeightInitialized) {
			const renderedItemHeight = firstItem?.clientHeight;
			if (renderedItemHeight) {
				itemHeight = renderedItemHeight;
				isItemHeightInitialized = true;
			}
		}
	});

	$effect(() => {
		init(
			list,
			items,
			i => (navIndex = i),
			selectItem,
			virtualized,
			scrollToVirtualized
		);
	});

	onMount(() => {
		onready &&
			onready({
				navigate: virtualized ? navigateVirtualized : navigate,
				keydown: virtualized ? keydownVirtualized : keydown,
				move,
			});
	});
</script>

{#snippet itemContent({ data })}
	{#if checkboxes}
		<Checkbox
			style="margin-right: 8px; pointer-events: none;"
			name={data.id}
			value={value && value.includes(data.id)}
		/>
	{/if}
	{#if children}
		{@render children({ option: data })}
	{:else}
		{data.label}
	{/if}
{/snippet}

{#snippet listContent()}
	{#each visibleItems as data, visibleIndex (data.id)}
		{#if visibleIndex + visibleRange.start === 0}
			<div
				class="wx-item"
				class:wx-focus={visibleIndex + visibleRange.start === navIndex}
				data-id={setID(data.id)}
				bind:this={firstItem}
			>
				{@render itemContent({ data })}
			</div>
		{:else}
			<div
				class="wx-item"
				class:wx-focus={visibleIndex + visibleRange.start === navIndex}
				data-id={setID(data.id)}
			>
				{@render itemContent({ data })}
			</div>
		{/if}
	{/each}
{/snippet}

{#if navIndex !== null}
	{#key items}
		<Dropdown oncancel={() => navigate(null)} {...rest}>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="wx-list"
				bind:this={list}
				onclick={selectItem}
				onmousemove={move}
				onscroll={handleScroll}
			>
				{#if items.length}
					{#if virtualized}
						<div
							class="wx-list-wrapper"
							style={`height: ${totalHeight}px;`}
						>
							<div
								class="wx-list-content"
								style={`transform: translateY(${offsetTop}px);`}
							>
								{@render listContent()}
							</div>
						</div>
					{:else}
						{@render listContent()}
					{/if}
				{:else}
					<div class="wx-no-data">{_("No data")}</div>
				{/if}
			</div>
		</Dropdown>
	{/key}
{/if}

<style>
	.wx-list {
		max-height: 250px;
		overflow-y: auto;
		position: relative;
	}

	.wx-list-wrapper {
		position: relative;
		width: 100%;
	}

	.wx-list-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
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
