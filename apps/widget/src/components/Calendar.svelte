<script lang="ts">
	import Panel from "./calendar/Panel.svelte";
	import Locale from "../Locale.svelte";
	import type { TPanelValue } from "./calendar/helpers";
	import type { TCalendarButton } from "../types";

	type Props = {
		value?: Date | null;
		current?: Date;
		markers?: ((date: Date) => string) | null;
		buttons?: boolean | TCalendarButton[];
		css?: string;
		onchange?: (ev: { value: Date | null }) => void;
	};

	let {
		value = $bindable(),
		current = $bindable(),
		markers = null,
		buttons = ["clear", "today"],
		css = "",
		onchange,
	}: Props = $props();

	function fixCurrent(force: unknown) {
		if (!current || force) current = value ? new Date(value) : new Date();
		current.setDate(1);
	}
	// svelte-ignore state_referenced_locally
	fixCurrent(value);

	function change(v: { value: TPanelValue | undefined }) {
		const x = v.value;
		if (x) {
			value = new Date(x);
			fixCurrent(true);
		} else {
			value = null;
		}

		onchange?.({ value });
	}
</script>

<Locale>
	<Panel {value} bind:current {markers} {buttons} {css} onchange={change} />
</Locale>
