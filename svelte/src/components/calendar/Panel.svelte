<script>
	import { getContext } from "svelte";
	import Header from "./Header.svelte";
	import Button from "./Button.svelte";
	import { configs } from "./helpers";

	const _ = getContext("wx-i18n").getGroup("calendar");

	let {
		value,
		current = $bindable(),
		done = false,
		part = "normal",
		markers = null,
		buttons = true,
		onshift: shift,
		onchange: change,
	} = $props();

	let type = $state("month");
	function selectDate(ev, date) {
		ev.preventDefault();
		change && change({ value: date });
	}
	function oncancel() {
		if (type === "duodecade") type = "year";
		else if (type === "year") type = "month";
	}

	function onshift(ev) {
		const { diff } = ev;

		if (diff == 0) {
			if (type === "month") type = "year";
			else if (type === "year") type = "duodecade";
			return;
		}
		if (diff) {
			const obj = configs[type];
			current = diff > 0 ? obj.next(current) : obj.prev(current);
		}
		shift && shift();
	}

	function onchange(value) {
		type = "month";
		change && change({ select: true, value });
	}

	const SvelteComponent = $derived(configs[type].component);
</script>

<div
	class="wx-calendar {part !== 'normal' && part !== 'both' ? 'wx-part' : ''}"
>
	<div class="wx-wrap">
		<Header date={current} {part} {type} {onshift} />
		<div>
			<SvelteComponent
				{value}
				bind:current
				{part}
				{markers}
				{onchange}
				{oncancel}
				{onshift}
			/>
			{#if type === "month" && buttons}
				<div class="wx-buttons">
					{#if done}
						<div class="wx-button-item">
							<Button onclick={e => selectDate(e, -1)}>
								{_("done")}
							</Button>
						</div>
					{/if}
					<div class="wx-button-item">
						<Button onclick={e => selectDate(e, null)}>
							{_("clear")}
						</Button>
					</div>
					<div class="wx-button-item">
						<Button onclick={e => selectDate(e, new Date())}>
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
