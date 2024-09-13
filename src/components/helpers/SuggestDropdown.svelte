<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { getListHandlers } from "./listnav";
	import Dropdown from "../Dropdown.svelte";

	export let items = [];

	let list;
	let navIndex = null;

	const dispatch = createEventDispatcher();
	const { move, keydown, init, navigate } = getListHandlers();

	const select = () => dispatch("select", { id: items[navIndex]?.id });
	$: init(list, items, i => (navIndex = i), select);

	onMount(() => {
		dispatch("ready", { navigate, keydown, move });
	});
</script>

{#if navIndex !== null}
	<Dropdown cancel={() => navigate(null)}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="wx-list"
			bind:this={list}
			on:click|stopPropagation={select}
			on:mousemove={move}
		>
			{#if items.length}
				{#each items as data, index (data.id)}
					<div
						class="wx-item"
						class:wx-focus={index === navIndex}
						data-id={data.id}
					>
						<slot option={data}>{data.name}</slot>
					</div>
				{/each}
			{:else}
				<div class="wx-no-data">No data</div>
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
