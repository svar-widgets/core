<script>
	import Button from "./Button.svelte";

	export let value = false;
	export let type = "";
	export let icon = null;
	export let disabled = null;
	export let iconActive = null;
	export let click;
	export let title = "";
	export let css = "";
	export let text = "";
	export let textActive = "";

	let typeStr = type;
	$: typeStr = (value ? "pressed" : "") + (type ? " " + type : "");

	function handleClick(ev) {
		if (click) click(ev);
		if (!ev.defaultPrevented) value = !value;
	}

	const SLOTS = $$props.$$slots;
</script>

{#if value && SLOTS && SLOTS.active}
	<Button
		{title}
		text={(value && textActive) || text}
		{css}
		type={typeStr}
		icon={(value && iconActive) || icon}
		click={handleClick}
		{disabled}
	>
		<slot name="active" />
	</Button>
{:else if SLOTS && SLOTS.default}
	<Button
		{title}
		text={(value && textActive) || text}
		{css}
		type={typeStr}
		icon={(value && iconActive) || icon}
		click={handleClick}
		{disabled}
	>
		<slot />
	</Button>
{:else}
	<Button
		{title}
		text={(value && textActive) || text}
		{css}
		type={typeStr}
		icon={(value && iconActive) || icon}
		click={handleClick}
		{disabled}
	/>
{/if}
