<script>
	let { css = "", title = "", children, onclick } = $props();
</script>

{#if children}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<i {title} role="img" class="wx-icon {css}" {onclick}>
		{@render children()}
	</i>
{:else}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<i {title} class="wx-icon {css}" {onclick}></i>
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
