<script>
	export let css = "";
	export let title = "";

	const SLOTS = $$props.$$slots;
</script>

{#if SLOTS && SLOTS.default}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<i {title} role="icon" class="wx-icon {css}" on:click>
		<slot />
	</i>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<i {title} class="wx-icon {css}" on:click />
{/if}

<style>
	.wx-icon {
		color: var(--wx-color-font-alt);
		cursor: pointer;
		font-size: var(--wx-button-icon-size);
		padding: var(--wx-button-icon-indent);

		line-height: var(--wx-button-line-height);
		display: inline-block;
	}
	.wx-icon:hover {
		background-color: var(--wx-background-hover);
	}
</style>
