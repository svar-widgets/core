<script>
	import { getContext } from "svelte";

	const locale = getContext("wx-i18n").getRaw().calendar;
	const monthNames = locale.monthFull;

	let { date, type, part, onshift } = $props();

	const month = $derived(date.getMonth());
	const year = $derived(date.getFullYear());
	const label = $derived.by(() => {
		switch (type) {
			case "month":
				return `${monthNames[month]} ${year}`;
			case "year":
				return year;
			case "duodecade": {
				const start = year - (year % 10);
				const end = start + 9;

				return `${start} - ${end}`;
			}
		}
	});

	function changeType() {
		onshift && onshift({ diff: 0, type });
	}
</script>

<div class="wx-header">
	{#if part != "right"}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i
			class="wx-pager wxi-angle-left"
			onclick={() => onshift && onshift({ diff: -1, type })}
		></i>
	{:else}<span class="wx-spacer"></span>{/if}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<span class="wx-label" onclick={changeType}>{label}</span>
	{#if part != "left"}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i
			class="wx-pager wxi-angle-right"
			onclick={() => onshift && onshift({ diff: 1, type })}
		></i>
	{:else}<span class="wx-spacer"></span>{/if}
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
