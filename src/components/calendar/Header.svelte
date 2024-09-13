<script>
	import { getContext, createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	const locale = getContext("wx-i18n").getRaw().calendar;
	const monthNames = locale.monthFull;

	export let date;
	export let type;

	export let part;

	let month, year, label;
	$: {
		month = date.getMonth();
		year = date.getFullYear();

		switch (type) {
			case "month":
				label = `${monthNames[month]} ${year}`;
				break;
			case "year":
				label = year;
				break;
			case "duodecade": {
				const start = year - (year % 10);
				const end = start + 9;

				label = `${start} - ${end}`;
				break;
			}
		}
	}

	function changeType() {
		dispatch("shift", { diff: 0, type });
	}
</script>

<div class="wx-header">
	{#if part != "right"}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			class="wx-pager wxi-angle-left"
			on:click={() => dispatch("shift", { diff: -1, type })}
		/>
	{:else}<span class="wx-spacer" />{/if}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span class="wx-label" on:click={changeType}>{label}</span>
	{#if part != "left"}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			class="wx-pager wxi-angle-right"
			on:click={() => dispatch("shift", { diff: 1, type })}
		/>
	{:else}<span class="wx-spacer" />{/if}
</div>

<style>
	.wx-header {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		margin-bottom: calc(var(--wx-calendar-gap) * 2);
		font-size: var(--wx-calendar-header-font-size);
		line-height: var(--wx-calendar-header-line-height);
		font-weight: var(--wx-calendar-header-font-weight);
	}

	.wx-spacer,
	.wx-pager {
		width: var(--wx-calendar-cell-size);
		height: var(--wx-calendar-cell-size);
		flex-shrink: 0;
	}
	.wx-pager {
		cursor: pointer;
		border-radius: 50%;
		line-height: 1;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		user-select: none;
		color: var(--wx-calendar-icon-color);
		font-size: var(--wx-calendar-icon-size);
	}
	.wx-pager:before {
		display: block;
	}
	.wx-pager:hover {
		background-color: var(--wx-background-hover);
	}

	.wx-label {
		flex: 0 0 calc(100% - var(--wx-calendar-cell-size) * 2);
		max-width: calc(100% - var(--wx-calendar-cell-size) * 2);
		text-align: center;
		color: var(--wx-color-link);
		cursor: pointer;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
