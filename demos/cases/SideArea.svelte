<script>
	import { Button, SideArea } from "../../src/index";
	let show = false;
</script>

<div class="demo-box">
	<h3>Side Area</h3>
	<p>Click button to show the side area</p>
	<Button on:click={() => (show = !show)}>Click me</Button>
	{#if show}
		<SideArea on:close={() => (show = false)}>
			<span class="descr">
				<h3>Some content</h3>
			</span>
		</SideArea>
	{/if}
</div>

<style>
	.descr {
		text-align: center;
	}
</style>
