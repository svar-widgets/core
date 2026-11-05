<script lang="ts" generics="T extends IOption">
	import { onMount, getContext, tick, type Snippet } from "svelte";
	import { getListHandlers } from "./listnav";
	import type { TKeydown, TMove, TNavigate } from "./listnav";
	import Dropdown from "../Dropdown.svelte";
	import { defaultLocale } from "./locale";
	import { setID, type ILocale } from "@svar-ui/lib-dom";
	import Checkbox from "../Checkbox.svelte";
	import type { DropdownOptions, IOption, TID } from "../../types";

	type Props = DropdownOptions & {
		items?: T[];
		children?: Snippet<[{ option: T }]>;
		onselect?: (ev: { id: TID | TID[] }) => void;
		onready?: (ev: {
			navigate: TNavigate;
			keydown: TKeydown;
			move: TMove;
		}) => void;
		checkboxes?: boolean;
		multiselect?: boolean;
		value?: TID | TID[];
	};

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
	}: Props = $props();

	const overscan = 3;
	let list = $state<HTMLElement>();
	let firstItem = $state<HTMLElement>();

	let navIndex = $state<number | null>(null);
	let scrollTop = $state(0);
	let itemHeight = $state(24);
	let isItemHeightInitialized = false;

	const _ = (getContext<ILocale>("wx-i18n") || defaultLocale()).getGroup(
		"core"
	);

	const { move, keydown, init, navigate } = getListHandlers();

	const scrollToVirtualized = (navIndex: number | null) => {
		if (list) {
			list.scrollTop =
				navIndex! * itemHeight - list.clientHeight + itemHeight;
			scrollTop = list.scrollTop;
		}
	};
	const navigateVirtualized: TNavigate = (dir, ev) => {
		navigate(dir, ev);
		tick().then(() => {
			scrollToVirtualized(navIndex);
		});
	};

	const keydownVirtualized: TKeydown = (ev, dir) => {
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
				const index = navIndex!;
				if (isInRange) {
					const isTargetVisibleTop =
						list.scrollTop <= index * itemHeight;
					const isTargetVisibleBottom =
						list.scrollTop + list.clientHeight >=
						index * itemHeight + itemHeight;

					if (!isTargetVisibleTop) {
						list.scrollTop = index * itemHeight;
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

	const selectItem = (ev?: MouseEvent) => {
		if (ev) ev.stopPropagation();
		let nextValue;
		const nextId = items[navIndex!]?.id;
		if (multiselect) {
			const ids = value as TID[];
			if (ids.includes(nextId)) {
				nextValue = ids.filter(i => i !== nextId);
			} else {
				nextValue = [...ids, nextId];
			}
		} else {
			nextValue = nextId;
		}
		onselect?.({ id: nextValue });
	};

	const displayedItemsCount = $derived.by(() =>
		Math.ceil((list?.clientHeight as number) / itemHeight)
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

	const handleScroll = (ev: Event) => {
		if (virtualized) {
			scrollTop = (ev.target as HTMLElement).scrollTop;
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
		init(list, items, i => (navIndex = i), selectItem, virtualized);
	});

	$effect(() => {
		// track the changes of the items
		void items;
		if (virtualized) scrollTop = 0;
	});

	onMount(() => {
		onready?.({
			navigate: virtualized ? navigateVirtualized : navigate,
			keydown: virtualized ? keydownVirtualized : keydown,
			move,
		});
	});
</script>

{#snippet itemContent({ data }: { data: T })}
	{#if checkboxes}
		<Checkbox
			css="wx-list-checkbox"
			value={!!value && (value as TID[]).includes(data.id)}
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
