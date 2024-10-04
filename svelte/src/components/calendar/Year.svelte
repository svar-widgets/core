<script>
	import { getContext } from "svelte";
	import { delegateClick } from "wx-lib-dom";
	import Button from "./Button.svelte";

	export let value;
	export let current;
	export let cancel;
	export let part;

	const locale = getContext("wx-i18n").getRaw().calendar;
	const months = locale.monthShort;

	let monthNum;
	$: {
		if (part !== "normal" && value) {
			if (part === "left" && value.start)
				monthNum = value.start.getMonth();
			else if (part === "right" && value.end)
				monthNum = value.end.getMonth();
			else monthNum = current.getMonth();
		} else {
			monthNum = current.getMonth();
		}
	}

	const selectMonths = {
		click: selectMonth,
	};
	function selectMonth(month, e) {
		if (month || month === 0) {
			e.stopPropagation();
			current.setMonth(month);
			current = current;
		}

		if (part === "normal") value = new Date(current);

		cancel();
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
	<Button click={cancel}>{locale.done}</Button>
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
	.wx-month:not(.wx-current):hover {
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
