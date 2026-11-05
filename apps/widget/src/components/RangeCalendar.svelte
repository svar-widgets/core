<script lang="ts">
	import { untrack } from "svelte";
	import Panel from "./calendar/Panel.svelte";
	import Locale from "../Locale.svelte";
	import type { TPanelValue } from "./calendar/helpers";
	import type { TCalendarButton } from "../types";

	type Props = {
		start?: Date | null;
		end?: Date | null;
		current?: Date;
		months?: 1 | 2;
		markers?: ((date: Date) => string) | null;
		buttons?: boolean | TCalendarButton[];
		css?: string;
		onchange?: (ev: { start: Date | null; end: Date | null }) => void;
	};

	let {
		start = $bindable(),
		end = $bindable(),
		current,
		months = 2,
		markers = null,
		buttons = ["clear", "today"],
		css = "",
		onchange,
	}: Props = $props();

	function addMonth(l: Date, diff: number, rPrev?: Date) {
		const r = new Date(l);
		r.setMonth(r.getMonth() + diff);
		if (rPrev && r.valueOf() == rPrev.valueOf()) return rPrev;
		return r;
	}

	function initLeft(startVal?: Date | null, currentVal?: Date) {
		const v = new Date(startVal || currentVal || new Date());
		v.setDate(1);
		return v;
	}

	// svelte-ignore state_referenced_locally
	const _initLeft = initLeft(start, current);
	let leftCurrent = $state(_initLeft);
	let rightCurrent = $state(addMonth(_initLeft, 1));

	$effect.pre(() => {
		// track the changes of both props
		void [start, current];
		untrack(() => onLeft(start ? new Date(start) : current || new Date()));
	});

	function onLeft(v: Date) {
		leftCurrent = v;
		leftCurrent.setDate(1);
		if (leftCurrent) rightCurrent = addMonth(leftCurrent, 1);
	}
	function onRight(v: Date) {
		rightCurrent = v;
		rightCurrent.setDate(1);
		if (rightCurrent) leftCurrent = addMonth(rightCurrent, -1);
	}

	function doChangeStart(v: PanelChange) {
		selectChange(v);
		if (start) onLeft(new Date(start));
	}
	function doChangeEnd(v: PanelChange) {
		selectChange(v);
		if (end) onRight(new Date(end));
	}

	type PanelChange = { value: TPanelValue | undefined; select?: boolean };

	function selectChange(ev: PanelChange) {
		const v = ev.value;
		const final = v === -1;
		if (!final) {
			if (ev.select) {
				const date = v as Date;
				if (!start || end) {
					start = date;
					end = null;
				} else {
					if (start > date) {
						end = start;
						start = date;
					} else {
						end = date;
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

		if (final || !Array.isArray(buttons) || !buttons.includes("done"))
			onchange?.({ start, end } as {
				start: Date | null;
				end: Date | null;
			});
	}
</script>

<Locale>
	{#if months == 1}
		<Panel
			value={{ start, end }}
			bind:current={leftCurrent}
			{markers}
			{buttons}
			{css}
			part="both"
			onchange={doChangeStart}
		/>
	{:else}
		<div class="wx-rangecalendar {css}">
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
