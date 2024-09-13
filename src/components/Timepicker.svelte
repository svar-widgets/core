<script>
	import Field from "./Field.svelte";
	import Text from "./Text.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Slider from "./Slider.svelte";
	import TwoState from "./TwoState.svelte";

	import { getContext } from "svelte";
	import { dateToString, uid } from "@wx/lib-dom";

	export let value = new Date(0, 0, 0, 0, 0);
	export let id = uid();
	export let title;
	export let css;
	export let disabled = false;
	export let error = false;
	export let format;

	const { calendar: calendarLocale, formats } =
		getContext("wx-i18n").getRaw();
	const h12 = calendarLocale.clockFormat == 12;
	let f, timeFormat, zeroBased;
	$: {
		f = format || formats.timeFormat;
		timeFormat =
			typeof f === "function" ? f : dateToString(f, calendarLocale);
		zeroBased = timeFormat(new Date(0, 0, 0, 1)).indexOf("01") != -1;
	}

	const maxH = 23;
	const maxM = 59;

	const update = (v, max) => {
		v = getNumber(v);
		return Math.min(v, max);
	};

	let popup;

	let hText = "",
		mText = "";
	let h = 0;
	let m = 0;
	let pm = false;

	$: initTime(value);
	function initTime(value) {
		if (value) {
			h = update(value.getHours(), maxH);
			m = update(value.getMinutes(), maxM);
		}
	}

	let textValue;
	$: updateTime(h, m);
	function updateTime(h, m) {
		pm = h > 11;
		hText = formatH(h);
		mText = formatM(m);
		textValue = timeFormat(new Date(0, 0, 0, h, m));

		if (
			(value && (value.getHours() !== h || value.getMinutes() !== m)) ||
			(!value && (h || m))
		) {
			const next = new Date(value);
			next.setMinutes(m);
			next.setHours(h);
			value = next;
		}
	}

	function click() {
		popup = true;
	}

	function togglePM() {
		h = (h + 12) % 24;
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

	function cancel() {
		popup = null;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="wx-timepicker"
	class:wx-error={error}
	class:wx-disabled={disabled}
	on:click={click}
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
		<Dropdown {cancel} width={"unset"}>
			<div class="wx-wrapper">
				<div class="wx-timer">
					<input
						class="wx-digit"
						bind:value={hText}
						on:blur={() => (h = updateH(hText))}
					/>
					<div class="wx-separator">:</div>
					<input
						class="wx-digit"
						bind:value={mText}
						on:blur={() => (m = update(mText, maxM))}
					/>
					{#if h12}
						<TwoState value={pm} click={togglePM}>
							<span>am</span>
							<span slot="active">pm</span>
						</TwoState>
					{/if}
				</div>
				<Field width={"unset"}>
					<Slider
						label={calendarLocale.hours}
						width={"unset"}
						bind:value={h}
						max={maxH}
					/>
				</Field>
				<Field width={"unset"}>
					<Slider
						label={calendarLocale.minutes}
						width={"unset"}
						bind:value={m}
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
