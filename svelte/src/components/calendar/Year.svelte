<script>
	import { getContext } from "svelte";
	import { delegateClick } from "@svar-ui/lib-dom";
	import Button from "./Button.svelte";
	import { getPartValue } from "./helpers";

	let {
		value = $bindable(),
		current = $bindable(),
		part,
		oncancel,
		onchange,
		onshift,
	} = $props();

	const locale = getContext("wx-i18n").getRaw().calendar;
	const months = locale.monthShort;

	const monthNum = $derived.by(() => current.getMonth());

	const selectMonths = {
		click: selectMonth,
	};
	function selectMonth(month, e) {
		if (month || month === 0) {
			e.stopPropagation();
			current.setMonth(month);
			current = new Date(current);

			onshift && onshift({});
		}

		if (part === "normal") value = new Date(current);

		oncancel && oncancel();
	}

	function done() {
		const date = new Date(getPartValue(value, part) || current);

		date.setMonth(current.getMonth());
		date.setFullYear(current.getFullYear());

		onchange && onchange(date);
	}
</script>

<div class="wx-months" use:delegateClick={selectMonths}>
	{#each months as month, i}
		<div class="wx-month" class:wx-current={monthNum === i} data-id={i}>
			{month}
		</div>
	{/each}
</div>
<div class="wx-buttons">
	<Button onclick={done}>{locale.done}</Button>
</div>

<style>
	.wx-months {
		display: flex;
		flex-wrap: wrap;
		margin: var(--wx-calendar-gap);
	}

	.wx-month {
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
	.wx-month.wx-current {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	}
	.wx-month:not(:global(.wx-current)):hover {
		background-color: var(--wx-background-hover);
	}

	.wx-buttons {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		margin-top: var(--wx-calendar-gap);
	}
</style>
