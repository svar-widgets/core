<script>
	import Locale from "../Locale.svelte";
	import Layout from "./modal/Layout.svelte";

	let { ...props } = $props();
</script>

<Locale>
	<Layout {...props} />
</Locale>
