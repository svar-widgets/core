<script>
	import { Button, ModalArea } from "../../src/index";
	let show = false;
</script>

<div class="demo-box">
	<h3>Modal Area</h3>
	<p>Click button to show the modal area</p>
	<Button on:click={() => (show = !show)}>Click me</Button>
	{#if show}
		<ModalArea on:close={() => (show = false)}>
			<div class="descr">
				<h3>Some content</h3>
				<p>To close the modal, click the button below</p>
				<Button on:click={() => (show = false)}>Close</Button>
			</div>
		</ModalArea>
	{/if}
</div>

<style>
	.descr {
		text-align: center;
		padding: 40px;
	}
</style>
