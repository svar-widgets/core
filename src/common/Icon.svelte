<script>
	export let css = "";
	export let title = "";

	const SLOTS = $$props.$$slots;

</script>

{#if SLOTS && SLOTS.default}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<i {title} class="icon {css}" on:click>
		<slot />
	</i>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<i {title} class="icon {css}" on:click />
{/if}

<style>
	.icon {
		color: var(--wx-color-font-alt);
		cursor: pointer;
		font-size: 20px;
	}
	.icon:hover {
		background-color: var(--wx-background-hover);
	}

</style>
