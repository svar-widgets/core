<script lang="ts">
	import type { Snippet } from "svelte";
	import Button from "./Button.svelte";
	import type { TButtonType } from "../types";

	type Props = {
		value?: boolean;
		type?: TButtonType;
		icon?: string;
		disabled?: boolean;
		iconActive?: string;
		onclick?: (ev: MouseEvent) => void;
		title?: string;
		tooltip?: string;
		css?: string;
		text?: string;
		textActive?: string;
		children?: Snippet;
		active?: Snippet;
		onchange?: (ev: { value: boolean }) => void;
	};

	let {
		value = false,
		type = "",
		icon = "",
		disabled = false,
		iconActive = "",
		onclick,
		title = "",
		tooltip,
		css = "",
		text = "",
		textActive = "",
		children,
		active,
		onchange,
	}: Props = $props();

	// "pressed" is an internal type, it styles the active state
	let typeStr = $derived(
		((value ? "pressed" : "") + (type ? " " + type : "")) as TButtonType
	);

	function handleClick(ev: MouseEvent) {
		let next = !value;
		if (onclick) onclick(ev);
		if (!ev.defaultPrevented) {
			value = next;
			onchange?.({ value });
		}
	}
</script>

{#if value && active}
	<Button
		{title}
		{tooltip}
		text={(value && textActive) || text}
		{css}
		type={typeStr}
		icon={(value && iconActive) || icon}
		onclick={handleClick}
		{disabled}
	>
		{@render active()}
	</Button>
{:else if children}
	<Button
		{title}
		{tooltip}
		text={(value && textActive) || text}
		{css}
		type={typeStr}
		icon={(value && iconActive) || icon}
		onclick={handleClick}
		{disabled}
	>
		{@render children()}
	</Button>
{:else}
	<Button
		{title}
		{tooltip}
		text={(value && textActive) || text}
		{css}
		type={typeStr}
		icon={(value && iconActive) || icon}
		onclick={handleClick}
		{disabled}
	/>
{/if}
