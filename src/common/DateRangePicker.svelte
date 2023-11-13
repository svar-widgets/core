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
	export let format = "%m/%d/%Y";
	export let months = 2;
	export let buttons;

	const dispatch = createEventDispatcher();

	const _ = getContext("wx-i18n").getRaw().calendar;
	let dateFormat =
		typeof format === "function" ? format : dateToString(format, _);
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

	function doChange(ev) {
		const d = ev.detail;
		value = d.start || d.end ? { start: d.start, end: d.end } : null;

		// fire after on-click finished
		if ((d.start && d.end) || (!d.start && !d.end)) {
			dispatch("select", { selected: value });
			setTimeout(cancel, 1);
		}
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
	class="datepicker"
	class:disabled
	class:error
	on:click={() => (popup = true)}>
	<Text
		{css}
		{title}
		value={formattedValue}
		{id}
		readonly={true}
		{disabled}
		{placeholder}
		{error}
		icon="wxi-calendar"
		inputStyle="cursor: pointer; width: 100%; padding-right: calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2);" />

	{#if popup && !disabled}
		<Dropdown {cancel} {width} {align} autoFit={!!align}>
			<RangeCalendar
				{done}
				{cancel}
				{buttons}
				{start}
				{end}
				{months}
				on:change={doChange} />
		</Dropdown>
	{/if}
</div>

<style>
	.datepicker {
		position: relative;
		width: var(--wx-input-width);
	}

</style>
