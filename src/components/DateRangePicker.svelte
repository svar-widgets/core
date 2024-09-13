<script>
	import { getContext, createEventDispatcher } from "svelte";
	import { uid, dateToString } from "@wx/lib-dom";

	import Text from "./Text.svelte";
	import Dropdown from "./Dropdown.svelte";
	import RangeCalendar from "./RangeCalendar.svelte";

	export let value;
	export let id = uid();
	export let disabled = false;
	export let error = false;
	export let done = false;
	export let width = "unset";
	export let align = "start";
	export let placeholder = "";
	export let css;
	export let title;
	export let format;
	export let months = 2;
	export let buttons;
	export let editable = false;

	const dispatch = createEventDispatcher();

	const { calendar: calendarLocale, formats } =
		getContext("wx-i18n").getRaw();
	const f = format || formats?.dateFormat;
	let dateFormat =
		typeof f === "function" ? f : dateToString(f, calendarLocale);
	let popup;

	function cancel() {
		popup = false;
	}

	let formattedValue;
	$: formattedValue = value
		? value.start
			? dateFormat(value.start) +
				(value.end ? ` - ${dateFormat(value.end)}` : "")
			: dateFormat(value)
		: "";

	function doChange(d) {
		value = d.start || d.end ? { start: d.start, end: d.end } : null;

		// fire after on-click finished
		if ((d.start && d.end) || (!d.start && !d.end)) {
			// FIXME - select event will trigger even if the same value
			dispatch("select", { selected: value });
			setTimeout(cancel, 1);
		}
	}

	function doInputChange(ev) {
		if (!editable) return;

		const { value: v, input } = ev.detail;
		if (input) return;

		// reset formatted value to ensure that text in the input will be repainted
		formattedValue = "";

		const [s, e] = v.split(" -").map((a, i) => {
			const av = a.trim();
			let date =
				typeof editable === "function"
					? editable(av)
					: av
						? new Date(av)
						: null;

			// if date is invalid ( incorrect text input ) then use old value
			// else use the entered date
			// in any case fallback to null, to prevent undefined as value
			let value = i === 0 ? start : end;
			return isNaN(date) ? (value ? value : null) : date || null;
		});

		doChange({ start: s, end: e });
	}

	let start, end;
	$: {
		if (!value) {
			start = end = null;
		} else {
			start = value.start || null;
			end = value.end || null;
		}
	}
</script>

<svelte:window on:scroll={cancel} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="wx-daterangepicker"
	class:wx-disabled={disabled}
	class:wx-error={error}
	on:click={() => (popup = true)}
>
	<Text
		{css}
		{title}
		value={formattedValue}
		{id}
		readonly={!editable}
		{disabled}
		{placeholder}
		{error}
		on:change={doInputChange}
		icon="wxi-calendar"
		inputStyle="cursor: pointer; width: 100%; padding-right: calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2);"
	/>

	{#if popup && !disabled}
		<Dropdown {cancel} {width} {align} autoFit={!!align}>
			<RangeCalendar
				{done}
				{cancel}
				{buttons}
				{start}
				{end}
				{months}
				on:change={e => doChange(e.detail)}
			/>
		</Dropdown>
	{/if}
</div>

<style>
	.wx-daterangepicker {
		position: relative;
		width: var(--wx-input-width);
	}
</style>
