<script>
	import { getContext } from "svelte";
	import { uid, dateToString } from "@svar-ui/lib-dom";

	import Text from "./Text.svelte";
	import Dropdown from "./Dropdown.svelte";
	import RangeCalendar from "./RangeCalendar.svelte";
	import { defaultLocale } from "./helpers/locale";

	let {
		value = $bindable(),
		id = uid(),
		disabled = false,
		error = false,
		width = "unset",
		align = "start",
		placeholder = "",
		css = "",
		title = "",
		format = "",
		months = 2,
		buttons = ["clear", "today"],
		editable = false,
		clear = false,
		onchange,
	} = $props();

	const { calendar: calendarLocale, formats } = (
		getContext("wx-i18n") || defaultLocale()
	).getRaw();
	const f = format || formats?.dateFormat;
	let dateFormat =
		typeof f === "function" ? f : dateToString(f, calendarLocale);
	let popup = $state();

	function oncancel() {
		// popup was closed before full range selected
		if (value && value.start && !value.end) onchange && onchange({ value });
		popup = false;
	}

	let formattedValue = $derived(
		value
			? value.start
				? dateFormat(value.start) +
					(value.end ? ` - ${dateFormat(value.end)}` : "")
				: dateFormat(value)
			: ""
	);

	function doChange(d) {
		value = d.start || d.end ? { start: d.start, end: d.end } : null;
		// fire after on-click finished
		if ((d.start && d.end) || (!d.start && !d.end)) {
			// FIXME - select event will trigger even if the same value
			onchange && onchange({ value });
			setTimeout(oncancel, 1);
		}
	}

	function doInputChange(ev) {
		if (!editable && !clear) return;

		const { value: v, input } = ev;
		if (input) return;

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

	const start = $derived(value ? value.start || null : null);
	const end = $derived(value ? value.end || null : null);
</script>

<svelte:window onscroll={oncancel} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="wx-daterangepicker"
	class:wx-disabled={disabled}
	class:wx-error={error}
	onclick={() => (popup = true)}
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
		onchange={doInputChange}
		icon="wxi-calendar"
		inputStyle="cursor: pointer; width: 100%; padding-right: calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2);"
		{clear}
	/>

	{#if popup && !disabled}
		<Dropdown {oncancel} {width} {align} autoFit={!!align}>
			<RangeCalendar
				{oncancel}
				{buttons}
				{start}
				{end}
				{months}
				onchange={doChange}
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
