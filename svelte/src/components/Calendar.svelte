<script>
	import Panel from "./calendar/Panel.svelte";
	import { configs } from "./calendar/helpers";

	let {
		value = $bindable(),
		current = $bindable(),
		markers = null,
		buttons = true,
		onchange: change,
	} = $props();

	function fixCurrent(force) {
		if (!current || force) current = value ? new Date(value) : new Date();
		current.setDate(1);
	}
	fixCurrent(value);

	function onshift({ diff, type, month }) {
		if (month || month === 0) {
			current = new Date(current);
			current.setMonth(month);
			return;
		}
		const obj = configs[type];
		current = diff > 0 ? obj.next(current) : obj.prev(current);
	}
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

<Panel {value} bind:current {markers} {buttons} {onshift} {onchange} />
