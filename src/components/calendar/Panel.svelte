<script>
	import { createEventDispatcher, getContext } from "svelte";
	const dispatch = createEventDispatcher();

	import Header from "./Header.svelte";
	import Button from "./Button.svelte";
	import { configs } from "./helpers";

	const _ = getContext("wx-i18n").getGroup("calendar");

	export let value;
	export let current;
	export let done = false;
	export let part = "normal";
	export let markers = null;
	export let buttons = true;

	let type = "month";
	function selectDate(ev, date) {
		ev.preventDefault();
		dispatch("change", { value: date });
	}
	function cancel() {
		if (type === "duodecade") type = "year";
		else if (type === "year") type = "month";
	}

	function doShift(ev) {
		if (ev.diff == 0) {
			if (type === "month") type = "year";
			else if (type === "year") type = "duodecade";
		} else {
			dispatch("shift", ev);
		}
	}

	function select(value) {
		dispatch("change", { select: true, value });
	}
</script>

<div
	class="wx-calendar {part !== 'normal' && part !== 'both' ? 'wx-part' : ''}"
>
	<div class="wx-wrap">
		<Header
			date={current}
			{part}
			{type}
			on:shift={ev => doShift(ev.detail)}
		/>
		<div>
			<svelte:component
				this={configs[type].component}
				{value}
				{current}
				{part}
				{markers}
				{select}
				{cancel}
			/>
			{#if type === "month" && buttons}
				<div class="wx-buttons">
					{#if done}
						<div class="wx-button-item">
							<Button click={e => selectDate(e, -1)}>
								{_("done")}
							</Button>
						</div>
					{/if}
					<div class="wx-button-item">
						<Button click={e => selectDate(e, null)}>
							{_("clear")}
						</Button>
					</div>
					<div class="wx-button-item">
						<Button click={e => selectDate(e, new Date())}>
							{_("today")}
						</Button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.wx-calendar {
		height: auto;
		width: 100%;
		padding: var(--wx-calendar-padding);
		cursor: default;
		font-family: var(--wx-calendar-font-family);
		font-size: var(--wx-calendar-font-size);
		line-height: var(--wx-calendar-line-height);
		font-weight: var(--wx-calendar-font-weight);
		color: var(--wx-calendar-font-color);
	}
	.wx-calendar.wx-part {
		padding-bottom: 0;
	}

	.wx-wrap {
		width: calc(var(--wx-calendar-cell-size) * 7);
		margin: 0 auto;
	}

	.wx-buttons {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-end;
		margin-top: calc(var(--wx-calendar-gap) * 2);
	}

	.wx-button-item + .wx-button-item {
		margin-left: calc(var(--wx-calendar-gap) * 3);
	}
</style>
