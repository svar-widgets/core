<script>
	import { onMount } from "svelte";
	import { Portal } from "../index.js";
	import Popup from "./Popup.svelte";
	import InlineDropdown from "./helpers/InlineDropdown.svelte";

	let {
		position = "bottom",
		align = "start",
		autoFit = true,
		inline = false,
		oncancel,
		width = "100%",
		...props
	} = $props();

	let target = $state();
	let node = $state();

	const at = $derived(`${position}-${align}`);

	onMount(() => {
		// get the parent element before
		// the popup is moved to the portal
		target = node.parentNode;
	});
</script>

{#if inline}
	<InlineDropdown {oncancel} {position} {align} {autoFit} {width} {...props}
	></InlineDropdown>
{:else}
	<Portal>
		<Popup parent={target} {at} {oncancel} {width} {...props}></Popup>
	</Portal>
{/if}

<span bind:this={node} class="wx-portal-node"></span>

<style>
	.wx-portal-node {
		display: none;
	}
</style>
