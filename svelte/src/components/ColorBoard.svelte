<script>
	import Locale from "../Locale.svelte";
	import Layout from "./colorboard/Layout.svelte";

	let { value = $bindable("#65D3B3"), ...props } = $props();
</script>

<Locale>
	<Layout bind:value {...props} />
</Locale>
