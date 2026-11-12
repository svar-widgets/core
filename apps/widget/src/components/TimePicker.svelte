<script lang="ts">
	import Field from "./Field.svelte";
	import Text from "./Text.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Slider from "./Slider.svelte";
	import TwoState from "./TwoState.svelte";

	import { getContext } from "svelte";
	import { dateToString, type ILocale } from "@svar-ui/lib-dom";
	import { defaultLocale } from "./helpers/locale";
	import { getInputId } from "./helpers/getInputId";
	import { toDateDropdown } from "./helpers/dropdown";
	import type {
		DropdownOptions,
		ICoreTerms,
		TDateFormat,
		TID,
	} from "../types";

	type Props = {
		value?: Date | null;
		id?: TID;
		title?: string;
		tooltip?: string;
		css?: string;
		disabled?: boolean;
		error?: boolean;
		format?: TDateFormat;
		onchange?: (ev: { value: Date }) => void;
		dropdown?: DropdownOptions;
	};

	const defValue = new Date(0, 0, 0, 0, 0);

	let {
		value = $bindable(defValue),
		id,
		title = "",
		tooltip,
		css = "",
		disabled = false,
		error = false,
		format = "",
		onchange,
		dropdown,
	}: Props = $props();

	// svelte-ignore state_referenced_locally
	const inputId = $state(getInputId(id));

	const { calendar: calendarLocale, formats } = (
		getContext<ILocale>("wx-i18n") || defaultLocale()
	).getRaw() as unknown as ICoreTerms;
	const h12 = calendarLocale.clockFormat == 12;

	const maxH = 23;
	const maxM = 59;

	const update = (v: number | string, max: number) => {
		v = getNumber(v);
		return Math.min(v as number, max);
	};

	let popup = $state<boolean | null>();

	// Let the blur handlers see the disabled state before removing the popup.
	$effect(() => {
		if (disabled) popup = null;
	});

	const safeValue = $derived(value || defValue);
	let h = $derived(update(safeValue.getHours(), maxH));
	let m = $derived(update(safeValue.getMinutes(), maxM));

	const pm = $derived(h > 12);
	const hText = $derived(formatH(h));
	const mText = $derived(formatM(m));

	function click() {
		if (disabled) return;
		popup = true;
	}

	function togglePM() {
		if (disabled) return;

		const next = new Date(safeValue);
		next.setHours(next.getHours() + (pm ? -12 : 12));
		value = next;
		onchange?.({ value });
	}
	function setHours({ value: v }: { value: number }) {
		if (disabled || safeValue.getHours() === v) return;

		const next = new Date(safeValue);
		next.setHours(v);
		value = next;
		onchange?.({ value });
	}
	function setMinutes({ value: v }: { value: number }) {
		if (disabled || safeValue.getMinutes() === v) return;

		const next = new Date(safeValue);
		next.setMinutes(v);
		value = next;
		onchange?.({ value });
	}
	function formatH(v: number) {
		if (h12) {
			v = v % 12;
			if (v === 0) return "12";
		}
		return formatTime(v, zeroBased);
	}

	function formatM(v: number) {
		return formatTime(v, true);
	}
	function updateH(v: string) {
		let n = update(v, maxH);
		if (h12) {
			n = n * 1;
			if (n === 12) n = 0;
			if (pm) n += 12;
		}
		return n;
	}

	// digits of the value; a string, or 0 if there are none
	function getNumber(v: number | string): number | string {
		return `${v}`.replace(/[^\d]/g, "") || 0;
	}

	function formatTime(v: number, zeroBased: boolean) {
		return (v < 10 && zeroBased ? `0${v}` : `${v}`).slice(-2);
	}

	function oncancel() {
		popup = null;
	}

	const timeFormat = $derived.by(() => {
		const f = format || formats.timeFormat;
		return typeof f === "function" ? f : dateToString(f, calendarLocale);
	});
	const zeroBased = $derived(
		timeFormat(new Date(0, 0, 0, 1)).indexOf("01") != -1
	);
	const textValue = $derived(timeFormat(new Date(0, 0, 0, h, m)));
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="wx-timepicker"
	class:wx-error={error}
	class:wx-disabled={disabled}
	onclick={click}
>
	<Text
		id={inputId}
		css={`wx-date-input ${css}`}
		{title}
		{tooltip}
		value={textValue}
		readonly={true}
		{disabled}
		{error}
		icon="wxi-clock"
	/>

	{#if popup}
		<Dropdown {oncancel} {...toDateDropdown(dropdown)}>
			<div class="wx-wrapper">
				<div class="wx-timer">
					<input
						class="wx-digit"
						value={hText}
						onblur={function (this: HTMLInputElement) {
							setHours({ value: updateH(this.value) });
						}}
					/>
					<div class="wx-separator">:</div>
					<input
						class="wx-digit"
						value={mText}
						onblur={function (this: HTMLInputElement) {
							setMinutes({ value: update(this.value, maxM) });
						}}
					/>
					{#if h12}
						<TwoState value={pm} onclick={togglePM}>
							<span>am</span>
							{#snippet active()}
								<span>pm</span>
							{/snippet}
						</TwoState>
					{/if}
				</div>
				<Field width={"unset"}>
					<Slider
						label={calendarLocale.hours}
						width={"unset"}
						value={h}
						onchange={setHours}
						max={maxH}
					/>
				</Field>
				<Field width={"unset"}>
					<Slider
						label={calendarLocale.minutes}
						width={"unset"}
						value={m}
						onchange={setMinutes}
						max={maxM}
					/>
				</Field>
			</div>
		</Dropdown>
	{/if}
</div>

<style>
	.wx-timepicker {
		position: relative;
		width: var(--wx-input-width);
	}

	.wx-wrapper {
		padding: 10px 20px;
	}

	.wx-timer {
		display: flex;
		text-align: center;
		justify-content: center;
		margin-bottom: 10px;
	}

	.wx-digit {
		display: block;
		width: 50px;
		height: 38px;
		border: none;
		border-bottom: var(--wx-input-border);
		font-family: var(--wx-input-font-family);
		font-size: 24px;
		line-height: 28px;
		padding: 5px;
		text-align: center;
		color: var(--wx-input-font-color);
		background-color: transparent;
		outline: none;
	}

	.wx-digit:focus {
		border-bottom: var(--wx-input-border-focus);
	}

	.wx-separator {
		font-size: 24px;
		line-height: 38px;
	}
</style>
