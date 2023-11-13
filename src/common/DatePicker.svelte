<script>
	import { getContext, createEventDispatcher } from "svelte";
	import { uid, dateToString } from "@wx/lib-dom";

	import Text from "./Text.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Calendar from "./Calendar.svelte";

	export let value;
	export let id = uid();
	export let disabled = false;
	export let error = false;
	export let width = "unset";
	export let align = "start";
	export let placeholder = "";
	export let format = "%m/%d/%Y";
	export let buttons;
	export let css;
	export let title;

	const dispatch = createEventDispatcher();

	const _ = getContext("wx-i18n").getRaw().calendar;
	let dateFormat =
		typeof format === "function" ? format : dateToString(format, _);
	let popup;

	function cancel() {
		popup = false;
	}

	function doChange(ev) {
		const v = ev.detail.value;
		value = v;
		dispatch("select", { selected: v });

		// fire after on-click finished
		setTimeout(cancel, 1);
	}

</script>

<svelte:window on:scroll={cancel} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="datepicker" on:click={() => (popup = true)}>
	<Text
		{css}
		{title}
		value={value ? dateFormat(value) : value}
		{id}
		readonly={true}
		{disabled}
		{error}
		{placeholder}
		icon="wxi-calendar"
		inputStyle="cursor: pointer; width: 100%; padding-right: calc(var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2);" />

	{#if popup && !disabled}
		<Dropdown {cancel} {width} {align} autoFit={!!align}>
			<Calendar {buttons} {value} on:change={doChange} />
		</Dropdown>
	{/if}
</div>

<style>
	.datepicker {
		position: relative;
		width: var(--wx-input-width);
	}

</style>
