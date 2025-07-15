<script>
	import Locale from "../Locale.svelte";
	import Layout from "./timepicker/Layout.svelte";

	const defValue = new Date(0, 0, 0, 0, 0);

	let { value = $bindable(defValue), ...props } = $props();
</script>

<Locale>
	<Layout bind:value {...props} />
</Locale>
