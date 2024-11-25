<script>
	import Notice from "./Notice.svelte";

	let { data = [] } = $props();
</script>

<div class="wx-notices">
	{#each data as notice (notice.id)}
		<Notice {notice} />
	{/each}
</div>

<style>
	.wx-notices {
		position: fixed;
		z-index: var(--wx-notice-z-index);
		top: 0;
		right: 0;
	}
</style>
