<script>
	import { Button, ColorPicker, Field, SideArea } from "../../src/index";
	let show = $state(false);
</script>

<div class="demo-box">
	<h3>Side Area</h3>
	<p>Click button to show the side area</p>
	<Button onclick={() => (show = !show)}>Click me</Button>
	{#if show}
		<SideArea on:close={() => (show = false)}>
			<div class="descr">
				<h3>Some content</h3>
				<Field label="Color">
					<ColorPicker />
				</Field>
			</div>
		</SideArea>
	{/if}
</div>

<style>
	.descr {
		text-align: left;
		width: 400px;
		padding: 20px;
	}
</style>
