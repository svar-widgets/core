<script lang="ts">
	import { Pager } from "@svar-ui/svelte-core";
	let value = $state(2);
	let pageSize = $state(10);
</script>

<div class="demo-box">
	<h3>100 rows (active = {value}, page size = {pageSize})</h3>
	<Pager bind:pageSize bind:value total={100} />
</div>
