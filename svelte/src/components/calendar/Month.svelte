<script>
	import { getContext } from "svelte";
	import { delegateClick } from "wx-lib-dom";

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
			css += !day.in ? " wx-inactive" : "";
			css += date.indexOf(day.date) > -1 ? " wx-selected" : "";

			if (ranges) {
				const s = day.date == date[0];
				const e = day.date == date[1];
				if (s && !e) css += " wx-left";
				else if (e && !s) css += " wx-right";

				if (day.date > date[0] && day.date < date[1])
					css += " wx-inrange";
			}

			css += isWeekEnd(d) ? " wx-weekend" : "";
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
	<div class="wx-weekdays">
		{#each weekdays as day}
			<div class="wx-weekday">{day}</div>
		{/each}
	</div>
	<div class="wx-days" use:delegateClick={selectDates}>
		{#each days as day (day.date)}
			<div
				class="wx-day {day.css}"
				class:wx-out={!day.in}
				data-id={day.date}
			>
				{day.day}
			</div>
		{/each}
	</div>
</div>

<style>
	.wx-weekdays {
		display: flex;
		flex-wrap: nowrap;
		margin-bottom: calc(var(--wx-calendar-gap) * 1.5);
	}

	.wx-weekday {
		flex: 0 0 calc(100% / 7);
		max-width: calc(100% / 7);
		font-size: var(--wx-font-size-sm);
		line-height: var(--wx-line-height-sm);
		color: var(--wx-color-font-alt);
		text-align: center;
	}

	.wx-days {
		display: flex;
		flex-wrap: wrap;
	}

	.wx-day {
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
	.wx-day:not(.wx-out):not(.wx-selected) {
		cursor: pointer;
	}
	.wx-day:not(.wx-out):not(.wx-selected):hover {
		background: var(--wx-background-hover);
	}
	.wx-day.wx-out {
		color: var(--wx-color-font-disabled);
	}
	.wx-day.wx-selected:not(.wx-out) {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	}
	.wx-day.wx-selected.wx-left:not(.wx-out) {
		border-radius: calc(var(--wx-calendar-border-radius)) 0 0
			calc(var(--wx-calendar-border-radius));
	}
	.wx-day.wx-selected.wx-right:not(.wx-out) {
		border-radius: 0 calc(var(--wx-calendar-border-radius))
			calc(var(--wx-calendar-border-radius)) 0;
	}
	.wx-day.wx-inrange:not(.wx-out) {
		border-radius: 0;
		background: var(--wx-color-primary-selected);
	}
	.wx-day.wx-weekend:not(.wx-selected):not(.wx-out) {
		color: var(--wx-color-primary);
	}
	.wx-day.wx-inactive {
		pointer-events: none;
	}
</style>
