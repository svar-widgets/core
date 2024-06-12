<script>
	import Field from "./Field.svelte";
	import Text from "./Text.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Slider from "./Slider.svelte";
	import TwoState from "./TwoState.svelte";

	import { getContext } from "svelte";
	import { uid } from "@wx/lib-dom";

	const _ = getContext("wx-i18n").getRaw().calendar;
	const h12 = _.timeFormat == 12;

	export let value = new Date(0, 0, 0, 0, 0);
	export let id = uid();
	export let title;
	export let css;
	export let disabled = false;
	export let error = false;

	const maxH = 23;
	const maxM = 59;

	const update = (v, max) => (v < max ? v : max);

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
		mText = format(m);
		textValue = `${hText}:${mText}${h12 ? (pm ? " pm" : " am") : ""}`;

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
		if (!h12) return format(h);

		v = v % 12;
		if (v === 0) return "12";

		return v < 10 ? "0" + v : v;
	}
	function updateH(v) {
		if (!h12) return v;

		v = v * 1;
		if (v === 12) v = 0;
		if (pm) v += 12;
		return v;
	}

	function format(v) {
		v = `${v}`.replace(/[^\d]/g, "");
		v = (v < 10 ? `0${v}` : v).slice(-2);
		return v;
	}

	function cancel() {
		popup = null;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="timepicker" class:error class:disabled on:click={click}>
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
			<div class="wrapper">
				<div class="timer">
					<input
						class="digit"
						bind:value={hText}
						on:blur={() => (h = updateH(hText, maxH))}
					/>
					<div class="separator">:</div>
					<input
						class="digit"
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
						label={_.hours}
						width={"unset"}
						bind:value={h}
						max={maxH}
					/>
				</Field>
				<Field width={"unset"}>
					<Slider
						label={_.minutes}
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
	.timepicker {
		position: relative;
		width: var(--wx-input-width);
	}

	.wrapper {
		padding: 10px 20px;
	}

	.timer {
		display: flex;
		text-align: center;
		justify-content: center;
		margin-bottom: 10px;
	}

	.digit {
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

	.digit:focus {
		border-bottom: var(--wx-input-border-focus);
	}

	.separator {
		font-size: 24px;
		line-height: 38px;
	}
</style>
