<script>
	import { Button, Popup, Slider } from "../../src/index";

	let node;
	let isOpen = false;
	let mode = "bottom";
	let parent = null;

	function showAt() {
		isOpen = true;
		mode = "point";
		parent = null;
	}
	function showNext() {
		isOpen = true;
		mode = "bottom";
		parent = node;
	}
	function showCenter() {
		isOpen = true;
		mode = "center";
		parent = document.body;
	}

	function cancel() {
		isOpen = false;
	}
</script>

<div class="demo-box">
	<h3>Popup</h3>
	<div class="toolbar">
		<div>
			<Button type="block" on:click={showAt}>Show at position</Button>
		</div>
		<div bind:this={node}>
			<Button type="block" on:click={showNext}>Show next to button</Button
			>
		</div>
		<div>
			<Button type="block" on:click={showCenter}>Show at center</Button>
		</div>
	</div>
</div>

{#if isOpen}
	<Popup {cancel} at={mode} {parent} left={100} top={100}>
		<div class="popup">
			<p>Some text here and there</p>
			<p>Some text here and there</p>
			<p>Some text here and there</p>
			<Slider />
		</div>
	</Popup>
{/if}

<style>
	.toolbar {
		width: 130px;
		display: flex;
		gap: 20px;
		width: auto;
	}
	.popup {
		padding: 10px 30px;
	}
</style>
