<script>
	import { hotkeys } from "@svar-ui/lib-dom";
	import Button from "./Button.svelte";

	let { hotkey = null, toggleButton, children } = $props();

	$effect(() => {
		if (hotkey)
			$hotkeys.configure(
				{
					[hotkey]: toggleFullscreen,
				},
				node
			);
	});

	let node = null;
	let inFullscreen = $state(false);
	let icon = $derived(`wxi-${inFullscreen ? "collapse" : "expand"}`);

	function toggleFullscreen() {
		if (!inFullscreen && node) {
			node.requestFullscreen();
		} else if (inFullscreen) {
			document.exitFullscreen();
		}
		inFullscreen = !inFullscreen;
	}

	const setFullscreenState = () => {
		inFullscreen = document.fullscreenElement === node;
	};

	$effect(() => {
		document.addEventListener("fullscreenchange", setFullscreenState);
		return () => {
			document.removeEventListener(
				"fullscreenchange",
				setFullscreenState
			);
		};
	});
</script>

<div class="wx-fullscreen" bind:this={node} tabindex="-1">
	{@render children?.()}
	{#if toggleButton}
		{@render toggleButton(toggleFullscreen, inFullscreen)}
	{:else}
		<Button css="wx-fullscreen-button" onclick={toggleFullscreen}>
			<i class={`${icon} wx-fullscreen-icon`}> </i>
		</Button>
	{/if}
</div>

<style>
	.wx-fullscreen::backdrop {
		background-color: var(--wx-background);
	}
	.wx-fullscreen {
		position: relative;
		height: 100%;
		width: 100%;
		outline: none;
	}
	.wx-fullscreen-icon {
		font-size: 20px;
		height: 20px;
		margin: auto;
	}
	.wx-fullscreen :global(.wx-fullscreen-button) {
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 50%;
		position: absolute;
		right: 25px;
		bottom: 35px;
		display: flex;
		padding: initial;
	}
</style>
