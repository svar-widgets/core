<script>
	import Panel from "./calendar/Panel.svelte";

	import Locale from "../Locale.svelte";

	let {
		value = $bindable(),
		current = $bindable(),
		markers = null,
		buttons = ["clear", "today"],
		onchange: change,
	} = $props();

	function fixCurrent(force) {
		if (!current || force) current = value ? new Date(value) : new Date();
		current.setDate(1);
	}
	fixCurrent(value);

	function onchange(v) {
		const x = v.value;
		if (x) {
			value = new Date(x);
			fixCurrent(true);
		} else {
			value = null;
		}

		change && change({ value });
	}
</script>

<Locale>
	<Panel {value} bind:current {markers} {buttons} {onchange} />
</Locale>
