<script>
	import { Button, Field, ColorPicker, ModalArea } from "../../src/index";
	let show = false;
</script>

<div class="demo-box">
	<h3>Modal Area</h3>
	<p>Click button to show the modal area</p>
	<Button on:click={() => (show = !show)}>Click me</Button>
	{#if show}
		<ModalArea on:close={() => (show = false)}>
			<div class="descr">
				<Field label="Color">
					<ColorPicker />
				</Field>
			</div>
			<div class="descr center">
				<p>To close the modal, click the button below</p>
				<Button on:click={() => (show = false)}>Close</Button>
			</div>
		</ModalArea>
	{/if}
</div>

<style>
	.descr {
		padding: 40px;
	}
	.center {
		text-align: center;
	}
</style>
