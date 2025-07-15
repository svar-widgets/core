<script>
	import Locale from "../Locale.svelte";
	import Layout from "./daterangepicker/Layout.svelte";

	let { value = $bindable(), ...props } = $props();
</script>

<Locale>
	<Layout bind:value {...props} />
</Locale>
