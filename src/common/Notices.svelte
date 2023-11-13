<script>
	import Notice from "./Notice.svelte";

	export let data;

</script>

<div class="area">
	{#each data as notice (notice.id)}
		<Notice {notice} />
	{/each}
</div>

<style>
	.area {
		position: fixed;
		z-index: var(--wx-notice-z-index);
		top: 0;
		right: 0;
	}

</style>
