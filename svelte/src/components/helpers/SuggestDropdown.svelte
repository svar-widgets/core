<script>
	import Locale from "../../Locale.svelte";
	import Layout from "./suggestDropdown/Layout.svelte";

	let { ...props } = $props();
</script>

<Locale>
	<Layout {...props} />
</Locale>
