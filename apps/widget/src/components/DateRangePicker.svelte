<script lang="ts">
	import { getContext } from "svelte";
	import { dateToString, type ILocale } from "@svar-ui/lib-dom";

	import Text from "./Text.svelte";
	import Dropdown from "./Dropdown.svelte";
	import RangeCalendar from "./RangeCalendar.svelte";
	import { defaultLocale } from "./helpers/locale";
	import { toDateDropdown } from "./helpers/dropdown";
	import type {
		DropdownOptions,
		ICoreTerms,
		IDateRange,
		TCalendarButton,
		TDateFormat,
		TID,
	} from "../types";

	type Props = {
		value?: IDateRange | null;
		id?: TID;
		disabled?: boolean;
		error?: boolean;
		placeholder?: string;
		css?: string;
		title?: string;
		tooltip?: string;
		format?: TDateFormat;
		months?: 1 | 2;
		buttons?: boolean | TCalendarButton[];
		editable?: boolean | ((value: string) => Date | null);
		clear?: boolean;
		onchange?: (ev: { value: IDateRange | null }) => void;
		dropdown?: DropdownOptions;
	};

	let {
		value = $bindable(),
		id,
		disabled = false,
		error = false,
		placeholder = "",
		css = "",
		title = "",
		tooltip,
		format = "",
		months = 2,
		buttons = ["clear", "today"],
		editable = false,
		clear = false,
		onchange,
		dropdown,
	}: Props = $props();

	const { calendar: calendarLocale, formats } = (
		getContext<ILocale>("wx-i18n") || defaultLocale()
	).getRaw() as unknown as ICoreTerms;
	// svelte-ignore state_referenced_locally
	const f = format || formats?.dateFormat;
	let dateFormat =
		typeof f === "function" ? f : dateToString(f, calendarLocale);
	let popup = $state<boolean>();

	function oncancel() {
		// popup was closed before full range selected
		if (value && value.start && !value.end) onchange?.({ value });
		popup = false;
	}

	let formattedValue = $derived(
		value
			? value.start
				? dateFormat(value.start) +
					(value.end ? ` - ${dateFormat(value.end)}` : "")
				: dateFormat(value as unknown as Date)
			: ""
	);

	function doChange(d: { start: Date | null; end: Date | null }) {
		value =
			d.start || d.end
				? ({ start: d.start, end: d.end } as IDateRange)
				: null;
		// fire after on-click finished
		if ((d.start && d.end) || (!d.start && !d.end)) {
			// FIXME - select event will trigger even if the same value
			onchange?.({ value });
			setTimeout(oncancel, 1);
		}
	}

	function doInputChange(ev: { value: TID; input?: boolean }) {
		if (!editable && !clear) return;

		const { value: v, input } = ev;
		if (input) return;

		const [s, e] = (v as string).split(" -").map((a, i) => {
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
			return isNaN(Number(date)) ? (value ? value : null) : date || null;
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
		css={`wx-date-input ${css}`}
		{title}
		{tooltip}
		value={formattedValue}
		{id}
		readonly={!editable}
		{disabled}
		{placeholder}
		{error}
		onchange={doInputChange}
		icon="wxi-calendar"
		{clear}
	/>

	{#if popup && !disabled}
		<Dropdown {oncancel} {...toDateDropdown(dropdown)}>
			<RangeCalendar
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
