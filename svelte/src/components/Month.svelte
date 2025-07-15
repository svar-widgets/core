<script>
	import Locale from "../Locale.svelte";
	import Month from "./calendar/Month.svelte";

	let { ...props } = $props();
</script>

<Locale>
	<Month {...props} />
</Locale>
