<script>
	import { untrack } from "svelte";
	import Panel from "./calendar/Panel.svelte";
	import Locale from "../Locale.svelte";

	let {
		start = $bindable(),
		end = $bindable(),
		current,
		months = 2,
		markers = null,
		buttons = ["clear", "today"],
		onchange,
	} = $props();

	function addMonth(l, diff, rPrev) {
		const r = new Date(l);
		r.setMonth(r.getMonth() + diff);
		if (rPrev && r.valueOf() == rPrev.valueOf()) return rPrev;
		return r;
	}

	let leftCurrent = $state(),
		rightCurrent = $state();

	$effect.pre(() => {
		start;
		current;
		untrack(() => {
			if (!leftCurrent) {
				onLeft(start ? new Date(start) : current || new Date());
			}
		});
	});

	function onLeft(v) {
		leftCurrent = v;
		leftCurrent.setDate(1);
		if (leftCurrent) rightCurrent = addMonth(leftCurrent, 1);
	}
	function onRight(v) {
		rightCurrent = v;
		rightCurrent.setDate(1);
		if (rightCurrent) leftCurrent = addMonth(rightCurrent, -1);
	}

	function doChangeStart(v) {
		selectChange(v);
		if (start) onLeft(new Date(start));
	}
	function doChangeEnd(v) {
		selectChange(v);
		if (end) onRight(new Date(end));
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

		if (final || !buttons.includes("done"))
			onchange && onchange({ start, end });
	}
</script>

<Locale>
	{#if months == 1}
		<Panel
			value={{ start, end }}
			bind:current={leftCurrent}
			{markers}
			{buttons}
			part="both"
			onchange={doChangeStart}
		/>
	{:else}
		<div class="wx-rangecalendar">
			<div class="wx-half">
				<Panel
					value={{ start, end }}
					bind:current={leftCurrent}
					{markers}
					buttons={false}
					part="left"
					onshift={() => onLeft(leftCurrent)}
					onchange={doChangeStart}
				/>
			</div>
			<div class="wx-half">
				<Panel
					value={{ start, end }}
					bind:current={rightCurrent}
					{markers}
					{buttons}
					part="right"
					onshift={() => onRight(rightCurrent)}
					onchange={doChangeEnd}
				/>
			</div>
		</div>
	{/if}
</Locale>

<style>
	.wx-rangecalendar {
		display: flex;
		padding-bottom: var(--wx-calendar-padding);
	}

	.wx-half {
		flex: 1;
	}
</style>
