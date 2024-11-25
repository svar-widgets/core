<script>
	import { getContext } from "svelte";
	import { delegateClick } from "wx-lib-dom";
	import Button from "./Button.svelte";

	const _ = getContext("wx-i18n").getRaw().calendar;

	let {
		value = $bindable(),
		current = $bindable(),
		oncancel,
		part,
	} = $props();

	const year = $derived(current.getFullYear());
	const years = $derived.by(() => {
		const start = year - (year % 10) - 1;
		const end = start + 12;
		const years = [];
		for (let y = start; y < end; ++y) {
			years.push(y);
		}
		return years;
	});

	const selectYears = {
		click: selectYear,
	};
	function selectYear(year, e) {
		if (year) {
			e.stopPropagation();
			current = new Date(current);
			current.setFullYear(year);
		}

		if (part === "normal") value = new Date(current);

		oncancel();
	}
</script>

<div class="wx-years" use:delegateClick={selectYears}>
	{#each years as y, i}
		<div
			class="wx-year"
			class:wx-current={year == y}
			class:wx-prev-decade={i === 0}
			class:wx-next-decade={i === 11}
			data-id={y}
		>
			{y}
		</div>
	{/each}
</div>
<div class="wx-buttons">
	<Button onclick={oncancel}>{_.done}</Button>
</div>

<style>
	.wx-years {
		display: flex;
		flex-wrap: wrap;
		margin: var(--wx-calendar-gap);
	}

	.wx-year {
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
	.wx-year.wx-current {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	}
	.wx-year:not(:global(.wx-current)):hover {
		background-color: var(--wx-background-hover);
	}
	.wx-prev-decade,
	.wx-next-decade {
		color: var(--wx-color-font-disabled);
	}
	.wx-buttons {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		margin-top: var(--wx-calendar-gap);
	}
</style>
