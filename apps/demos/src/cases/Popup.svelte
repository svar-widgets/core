<script lang="ts">
	import { Button, Popup, Slider } from "@svar-ui/svelte-core";
	import { env } from "@svar-ui/lib-dom";
	import type { TPosition } from "@svar-ui/svelte-core";

	let node: HTMLElement | null = null;
	let isOpen = $state(false);
	let mode = $state<TPosition>("bottom");
	let parent = $state<HTMLElement | null>(null);

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
	function showCenter(ev: MouseEvent) {
		isOpen = true;
		mode = "center";
		parent = env.getTopNode(ev.target as HTMLElement);
	}

	function oncancel() {
		isOpen = false;
	}
</script>

<div class="demo-box">
	<h3>Popup (local)</h3>
	<div class="demo-row">
		<Button onclick={showAt}>Show at position</Button>
		<div bind:this={node}>
			<Button onclick={showNext}>Show next to button</Button>
		</div>
		<Button onclick={showCenter}>Show at center</Button>
	</div>
</div>

{#if isOpen}
	<Popup {oncancel} at={mode} {parent} left={100} top={100}>
		<div class="popup">
			<p>Some text here and there</p>
			<p>Some text here and there</p>
			<p>Some text here and there</p>
			<Slider />
		</div>
	</Popup>
{/if}

<style>
	.popup {
		padding: 10px 30px;
	}
</style>
