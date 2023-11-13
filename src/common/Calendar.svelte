<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	import Panel from "./calendar/Panel.svelte";
	import { configs } from "./calendar/helpers";

	export let value;
	export let current;
	export let markers = null;
	export let buttons = true;

	function fixCurrent() {
		if (!current) current = value || new Date();
	}
	$: fixCurrent(value);

	function doShift({ diff, type }) {
		const obj = configs[type];
		current = diff > 0 ? obj.next(current) : obj.prev(current);
	}
	function doChange(v) {
		const x = v.value;
		if (x) {
			current = new Date(x);
			value = new Date(x);
		} else {
			value = null;
		}

		dispatch("change", { value });
	}

</script>

<Panel
	{value}
	{current}
	{markers}
	{buttons}
	on:shift={ev => doShift(ev.detail)}
	on:change={ev => doChange(ev.detail)} />
