<script>
	import Field from "./Field.svelte";
	import Text from "./Text.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Slider from "./Slider.svelte";
	import TwoState from "./TwoState.svelte";

	import { getContext } from "svelte";
	import { dateToString, uid } from "@svar-ui/lib-dom";
	import { defaultLocale } from "./helpers/locale";

	const defValue = new Date(0, 0, 0, 0, 0);

	let {
		value = $bindable(defValue),
		id = uid(),
		title = "",
		css = "",
		disabled = false,
		error = false,
		format = "",
		onchange,
	} = $props();

	const { calendar: calendarLocale, formats } = (
		getContext("wx-i18n") || defaultLocale()
	).getRaw();
	const h12 = calendarLocale.clockFormat == 12;

	const maxH = 23;
	const maxM = 59;

	const update = (v, max) => {
		v = getNumber(v);
		return Math.min(v, max);
	};

	let popup = $state();

	const safeValue = $derived(value || defValue);
	let h = $derived(update(safeValue.getHours(), maxH));
	let m = $derived(update(safeValue.getMinutes(), maxM));

	const pm = $derived(h > 12);
	const hText = $derived(formatH(h));
	const mText = $derived(formatM(m));
	const textValue = $derived(timeFormat(new Date(0, 0, 0, h, m)));

	function click() {
		popup = true;
	}

	function togglePM() {
		const next = new Date(safeValue);
		next.setHours(next.getHours() + (pm ? -12 : 12));
		value = next;
		onchange && onchange({ value });
	}
	function setHours({ value: v }) {
		if (safeValue.getHours() === v) return;

		const next = new Date(safeValue);
		next.setHours(v);
		value = next;
		onchange && onchange({ value });
	}
	function setMinutes({ value: v }) {
		if (safeValue.getMinutes() === v) return;

		const next = new Date(safeValue);
		next.setMinutes(v);
		value = next;
		onchange && onchange({ value });
	}
	function formatH(v) {
		if (h12) {
			v = v % 12;
			if (v === 0) return "12";
		}
		return formatTime(v, zeroBased);
	}

	function formatM(v) {
		return formatTime(v, true);
	}
	function updateH(v) {
		v = update(v, maxH);
		if (h12) {
			v = v * 1;
			if (v === 12) v = 0;
			if (pm) v += 12;
		}
		return v;
	}

	function getNumber(v) {
		return `${v}`.replace(/[^\d]/g, "") || 0;
	}

	function formatTime(v, zeroBased) {
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
		{id}
		{css}
		{title}
		value={textValue}
		readonly={true}
		{disabled}
		{error}
		icon="wxi-clock"
		inputStyle="cursor: pointer; width: 100%; padding-right: calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2);"
	/>

	{#if popup && !disabled}
		<Dropdown {oncancel} width={"unset"}>
			<div class="wx-wrapper">
				<div class="wx-timer">
					<input
						class="wx-digit"
						value={hText}
						onblur={function () {
							setHours({ value: updateH(this.value) });
						}}
					/>
					<div class="wx-separator">:</div>
					<input
						class="wx-digit"
						value={mText}
						onblur={function () {
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
