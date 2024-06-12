<script>
	import { getContext } from "svelte";
	import { delegateClick } from "@wx/lib-dom";

	export let value;
	export let current;
	export let cancel;
	export let select;
	export let part;
	export let markers = null;

	const locale = getContext("wx-i18n").getRaw().calendar;
	const weekStart = (locale.weekStart || 7) % 7;
	const weekdays = locale.dayShort
		.slice(weekStart)
		.concat(locale.dayShort.slice(0, weekStart));

	let days;
	let date;

	const dv = (d, dm, dd) =>
		new Date(
			d.getFullYear(),
			d.getMonth() + (dm || 0),
			d.getDate() + (dd || 0)
		);
	let ranges = part !== "normal";
	$: {
		if (part == "normal") date = [value ? dv(value).valueOf() : 0];
		else
			date = value
				? [
						value.start ? dv(value.start).valueOf() : 0,
						value.end ? dv(value.end).valueOf() : 0,
					]
				: [0, 0];

		const start = getStart();
		const end = getEnd();
		const curMonth = current.getMonth();
		days = [];
		for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
			const day = {
				day: d.getDate(),
				in: d.getMonth() === curMonth,
				date: d.valueOf(),
			};

			let css = "";
			css += !day.in ? " inactive" : "";
			css += date.indexOf(day.date) > -1 ? " selected" : "";

			if (ranges) {
				const s = day.date == date[0];
				const e = day.date == date[1];
				if (s && !e) css += " left";
				else if (e && !s) css += " right";

				if (day.date > date[0] && day.date < date[1]) css += " inrange";
			}

			css += isWeekEnd(d) ? " weekend" : "";
			if (markers) {
				const mark = markers(d);
				if (mark) css += " " + mark;
			}

			days.push({ ...day, css });
		}
	}

	function isWeekEnd(date) {
		const d = date.getDay();
		return d === 0 || d === 6;
	}

	function getStart() {
		const start = dv(current, 0, 1 - current.getDate());
		start.setDate(
			start.getDate() - ((start.getDay() - (weekStart - 7)) % 7)
		);
		return start;
	}
	function getEnd() {
		const end = dv(current, 1, -current.getDate());
		end.setDate(end.getDate() + ((6 - end.getDay() + weekStart) % 7));
		return end;
	}

	const selectDates = {
		click: selectDate,
	};

	function selectDate(date, e) {
		if (select) {
			e.stopPropagation();
			select(new Date(new Date(date)));
		}
		if (cancel) cancel();
	}
</script>

<div>
	<div class="weekdays">
		{#each weekdays as day}
			<div class="weekday">{day}</div>
		{/each}
	</div>
	<div class="days" use:delegateClick={selectDates}>
		{#each days as day (day.date)}
			<div class="day {day.css}" class:out={!day.in} data-id={day.date}>
				{day.day}
			</div>
		{/each}
	</div>
</div>

<style>
	.weekdays {
		display: flex;
		flex-wrap: nowrap;
		margin-bottom: calc(var(--wx-calendar-gap) * 1.5);
	}

	.weekday {
		flex: 0 0 calc(100% / 7);
		max-width: calc(100% / 7);
		font-size: var(--wx-font-size-sm);
		line-height: var(--wx-line-height-sm);
		color: var(--wx-color-font-alt);
		text-align: center;
	}

	.days {
		display: flex;
		flex-wrap: wrap;
	}

	.day {
		border-radius: var(--wx-calendar-border-radius);
		flex: 0 0 calc(100% / 7);
		max-width: calc(100% / 7);
		height: calc(
			var(--wx-calendar-cell-size) - var(--wx-calendar-line-gap) * 2
		);
		margin: calc(var(--wx-calendar-line-gap) / 2) 0;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.day:not(.out):not(.selected) {
		cursor: pointer;
	}
	.day:not(.out):not(.selected):hover {
		background: var(--wx-background-hover);
	}
	.day.out {
		color: var(--wx-color-font-disabled);
	}
	.day.selected:not(.out) {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	}
	.day.selected.left:not(.out) {
		border-radius: calc(var(--wx-calendar-border-radius)) 0 0
			calc(var(--wx-calendar-border-radius));
	}
	.day.selected.right:not(.out) {
		border-radius: 0 calc(var(--wx-calendar-border-radius))
			calc(var(--wx-calendar-border-radius)) 0;
	}
	.day.inrange:not(.out) {
		border-radius: 0;
		background: var(--wx-color-primary-selected);
	}
	.day.weekend:not(.selected):not(.out) {
		color: var(--wx-color-primary);
	}
	.day.inactive {
		pointer-events: none;
	}
</style>
