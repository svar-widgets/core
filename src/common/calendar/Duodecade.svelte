<script>
	import { getContext } from "svelte";
	import { delegateClick } from "@wx/lib-dom";
	import Button from "./Button.svelte";

	const _ = getContext("wx-i18n").getRaw().calendar;

	export let value;
	export let current;
	export let cancel;
	export let part;

	let years;
	let year;
	$: {
		year = current.getFullYear();

		const start = year - (year % 10) - 1;
		const end = start + 12;
		years = [];
		for (let y = start; y < end; ++y) {
			years.push(y);
		}
	}

	const selectYears = {
		click: selectYear,
	};
	function selectYear(year, e) {
		if (year) {
			e.stopPropagation();
			current.setFullYear(year);
			current = current;
		}

		if (part === "normal") value = new Date(current);

		cancel();
	}

</script>

<div class="years" use:delegateClick={selectYears}>
	{#each years as y, i}
		<div
			class="year"
			class:current={year == y}
			class:prev-decade={i === 0}
			class:next-decade={i === 11}
			data-id={y}>
			{y}
		</div>
	{/each}
</div>
<div class="buttons">
	<Button click={cancel}>{_.done}</Button>
</div>

<style>
	.years {
		display: flex;
		flex-wrap: wrap;
		margin: var(--wx-calendar-gap);
	}

	.year {
		flex: 0 0 calc(100% / 4 - var(--wx-calendar-gap) * 2);
		max-width: calc(100% / 4 - var(--wx-calendar-gap) * 2);
		margin: calc(var(--wx-calendar-gap) * 2) var(--wx-calendar-gap);
		text-align: center;
		cursor: pointer;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		height: var(--wx-calendar-cell-size);
		border-radius: var(--wx-calendar-border-radius);
	}
	.year.current {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	}
	.year:not(.current):hover {
		background-color: var(--wx-background-hover);
	}
	.prev-decade,
	.next-decade {
		color: var(--wx-color-font-disabled);
	}
	.buttons {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		margin-top: var(--wx-calendar-gap);
	}

</style>
