<script>
	import { getContext, createEventDispatcher } from "svelte";
	import { uid, dateToString } from "@wx/lib-dom";

	import Text from "./Text.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Calendar from "./Calendar.svelte";

	export let value;
	export let id = uid();
	export let disabled = false;
	export let error = false;
	export let width = "unset";
	export let align = "start";
	export let placeholder = "";
	export let format = "%m/%d/%Y";
	export let buttons = true;
	export let css = "";
	export let title = "";
	export let editable = false;

	const dispatch = createEventDispatcher();

	const _ = getContext("wx-i18n").getRaw().calendar;
	let dateFormat =
		typeof format === "function" ? format : dateToString(format, _);
	let popup;

	function cancel() {
		popup = false;
	}

	function doChange(v) {
		// skip "select" event if the same value
		// or different objects with the same value
		const skipEvent =
			v === value ||
			(v && value && v.valueOf() === value.valueOf()) ||
			(!v && !value);

		value = v;
		if (!skipEvent) {
			dispatch("select", { selected: v });
		}

		// fire after on-click finished
		setTimeout(cancel, 1);
	}

	let formattedValue;
	$: formattedValue = value ? dateFormat(value) : "";

	function doChangeInput(ev) {
		if (!editable) return;

		const { value: v, input } = ev.detail;
		if (input) return;

		// ensure that text in the input will be repainted
		formattedValue = "";

		// convert to date, but ignore empty string input
		let date =
			typeof editable === "function"
				? editable(v)
				: v
					? new Date(v)
					: null;

		// if date is invalid ( incorrect text input ) then use old value
		// else use the entered date
		// in any case fallback to null, to prevent undefined as value
		date = isNaN(date) ? value || null : date || null;
		doChange(date);
	}
</script>

<svelte:window on:scroll={cancel} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="datepicker" on:click={() => (popup = true)}>
	<Text
		{css}
		{title}
		value={formattedValue}
		{id}
		readonly={!editable}
		{disabled}
		{error}
		{placeholder}
		on:input={cancel}
		on:change={doChangeInput}
		icon="wxi-calendar"
		inputStyle="cursor: pointer; width: 100%; padding-right: calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2);"
	/>

	{#if popup && !disabled}
		<Dropdown {cancel} {width} {align} autoFit={!!align}>
			<Calendar
				{buttons}
				{value}
				on:change={e => doChange(e.detail.value)}
			/>
		</Dropdown>
	{/if}
</div>

<style>
	.datepicker {
		position: relative;
		width: var(--wx-input-width);
	}
</style>
