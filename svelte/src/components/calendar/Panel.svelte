<script>
	import { getContext } from "svelte";
	import Header from "./Header.svelte";
	import Button from "./Button.svelte";
	import { configs } from "./helpers";

	const _ = getContext("wx-i18n").getGroup("calendar");

	let {
		value,
		current = $bindable(),
		part = "normal",
		markers = null,
		buttons = ["clear", "today"],
		onshift: shift,
		onchange: change,
	} = $props();

	let type = $state("month");

	let buttonList = $derived.by(() => {
		if (Array.isArray(buttons)) return buttons;
		return buttons ? ["clear", "today"] : [];
	});

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

		if (diff === 0) {
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

	function getButtonValue(btn) {
		if (btn === "done") return -1;
		if (btn === "clear") return null;
		if (btn === "today") return new Date();
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

			{#if type === "month" && buttonList.length > 0}
				<div class="wx-buttons">
					{#each buttonList as btn}
						<div class="wx-button-item">
							<Button
								onclick={e =>
									selectDate(e, getButtonValue(btn))}
							>
								{_(btn)}
							</Button>
						</div>
					{/each}
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
