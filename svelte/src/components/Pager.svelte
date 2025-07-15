<script>
	import Locale from "../Locale.svelte";
	import Combo from "./pager/Layout.svelte";

	let { value = $bindable(1), pageSize = $bindable(20), ...props } = $props();
</script>

<Locale>
	<Combo bind:value bind:pageSize {...props} />
</Locale>
