<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import type { TPosition } from "@svar-ui/lib-dom";
	import Portal from "./Portal.svelte";
	import Popup from "./Popup.svelte";
	import InlineDropdown from "./helpers/InlineDropdown.svelte";
	import type { DropdownOptions } from "../types";

	type Props = DropdownOptions & {
		children?: Snippet;
		oncancel?: (ev: MouseEvent) => void;
	};

	let {
		position = "bottom",
		align = "start",
		autoFit = true,
		inline = false,
		oncancel,
		width = "100%",
		...props
	}: Props = $props();

	let target = $state<HTMLElement>();
	let node: HTMLElement;

	const at = $derived(`${position}-${align}` as TPosition);

	onMount(() => {
		// get the parent element before
		// the popup is moved to the portal
		target = node.parentNode as HTMLElement;
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
