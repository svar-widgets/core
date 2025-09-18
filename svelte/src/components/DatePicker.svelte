<script>
	import { getContext } from "svelte";
	import { uid, dateToString } from "@svar-ui/lib-dom";

	import Text from "./Text.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Calendar from "./Calendar.svelte";
	import { defaultLocale } from "./helpers/locale";

	let {
		value = $bindable(),
		id = uid(),
		disabled = false,
		error = false,
		width = "unset",
		align = "start",
		placeholder = "",
		format = "",
		buttons = ["clear", "today"],
		css = "",
		title = "",
		editable = false,
		clear = false,
		onchange,
	} = $props();

	const { calendar: calendarLocale, formats } = (
		getContext("wx-i18n") || defaultLocale()
	).getRaw();
	const f = format || formats.dateFormat;
	let dateFormat =
		typeof f === "function" ? f : dateToString(f, calendarLocale);

	let popup = $state();

	function oncancel() {
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
			onchange && onchange({ value });
		}

		// fire after on-click finished
		setTimeout(oncancel, 1);
	}

	const formattedValue = $derived(value ? dateFormat(value) : "");

	function change({ value: v, input }) {
		if (!editable && !clear) return;
		if (input) return;

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

<svelte:window onscroll={oncancel} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="wx-datepicker" onclick={() => (popup = true)}>
	<Text
		{css}
		{title}
		value={formattedValue}
		{id}
		readonly={!editable}
		{disabled}
		{error}
		{placeholder}
		oninput={oncancel}
		onchange={change}
		icon="wxi-calendar"
		inputStyle="cursor: pointer; width: 100%; padding-right: calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2);"
		{clear}
	/>

	{#if popup && !disabled}
		<Dropdown {oncancel} {width} {align} autoFit={!!align}>
			<Calendar {buttons} {value} onchange={e => doChange(e.value)} />
		</Dropdown>
	{/if}
</div>

<style>
	.wx-datepicker {
		position: relative;
		width: var(--wx-input-width);
	}
</style>
