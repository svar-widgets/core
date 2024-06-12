<script>
	import { Button, Popup, Portal, Slider } from "../../src/index";

	let node;
	let area;

	function click() {
		area = { left: 41, top: 101 };
	}

	function cancel() {
		area = null;
	}
</script>

<div class="demo-box">
	<h3>Popup</h3>
	<div bind:this={node}>
		<Button {click}>Show Popup</Button>
	</div>
</div>

{#if area}
	<Portal>
		<Popup {area} {cancel}>
			<div class="popup">
				<p>Some text here and there</p>
				<p>Some text here and there</p>
				<p>Some text here and there</p>
				<Slider />
			</div>
		</Popup>
	</Portal>
{/if}

<style>
	.popup {
		padding: 10px 30px;
	}
</style>
