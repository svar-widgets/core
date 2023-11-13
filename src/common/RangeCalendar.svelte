<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	import Panel from "./calendar/Panel.svelte";
	import { configs } from "./calendar/helpers";

	export let start;
	export let end;
	export let done;
	export let current;
	export let months = 2;
	export let markers = null;
	export let buttons = true;

	function addMonth(l, diff, rPrev) {
		const r = new Date(l);
		r.setMonth(r.getMonth() + diff);
		if (rPrev && r.valueOf() == rPrev.valueOf()) return rPrev;
		return r;
	}

	let leftCurrent, rightCurrent;
	function setInitCurrents(s) {
		leftCurrent = s ? new Date(s) : current || new Date();
	}
	$: setInitCurrents(start);

	function onLeft() {
		if (leftCurrent) rightCurrent = addMonth(leftCurrent, 1);
	}
	function onRight() {
		if (rightCurrent) leftCurrent = addMonth(rightCurrent, -1);
	}

	$: onLeft(leftCurrent);
	$: onRight(rightCurrent);

	function doShift({ diff, type }) {
		const obj = configs[type];
		if (diff > 0) {
			rightCurrent = obj.next(rightCurrent);
		} else if (diff < 0) {
			leftCurrent = obj.prev(leftCurrent);
		}
	}

	function doChangeStart(v) {
		selectChange(v);
		if (start) leftCurrent = new Date(start);
	}
	function doChangeEnd(v) {
		selectChange(v);
		if (end) rightCurrent = new Date(end);
	}
	function selectChange(ev) {
		const v = ev.value;
		const final = v === -1;
		if (!final) {
			if (ev.select) {
				if (!start || end) {
					start = v;
					end = null;
				} else {
					if (start > v) {
						end = start;
						start = v;
					} else {
						end = v;
					}
				}
			} else {
				if (!v) {
					start = end = null;
				} else {
					start = new Date(v);
					end = new Date(v);
				}
			}
		}

		if (final || !done) dispatch("change", { start, end });
	}

</script>

{#if months == 1}
	<Panel
		value={{ start: start, end: end }}
		current={leftCurrent}
		{markers}
		{done}
		{buttons}
		part="both"
		on:shift={ev => doShift(ev.detail)}
		on:change={ev => doChangeStart(ev.detail)} />
{:else}
	<div class="calendars">
		<div class="half">
			<Panel
				value={{ start: start, end: end }}
				current={leftCurrent}
				{markers}
				buttons={false}
				part="left"
				on:shift={ev => doShift(ev.detail)}
				on:change={ev => doChangeStart(ev.detail)} />
		</div>
		<div class="half">
			<Panel
				value={{ start: start, end: end }}
				current={rightCurrent}
				{markers}
				{done}
				{buttons}
				part="right"
				on:shift={ev => doShift(ev.detail)}
				on:change={ev => doChangeEnd(ev.detail)} />
		</div>
	</div>
{/if}

<style>
	.calendars {
		display: flex;
		padding-bottom: var(--wx-calendar-padding);
	}

	.half {
		flex: 1;
	}

</style>
