<script>
	import Button from "./Button.svelte";

	let {
		value = false,
		type = "",
		icon = null,
		disabled = null,
		iconActive = null,
		onclick,
		title = "",
		css = "",
		text = "",
		textActive = "",
		children,
		active,
		onchange,
	} = $props();

	let typeStr = $derived((value ? "pressed" : "") + (type ? " " + type : ""));

	function handleClick(ev) {
		let next = !value;
		if (onclick) onclick(ev);
		if (!ev.defaultPrevented) {
			value = next;
			onchange && onchange({ value });
		}
	}
</script>

{#if value && active}
	<Button
		{title}
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
		text={(value && textActive) || text}
		{css}
		type={typeStr}
		icon={(value && iconActive) || icon}
		onclick={handleClick}
		{disabled}
	/>
{/if}
