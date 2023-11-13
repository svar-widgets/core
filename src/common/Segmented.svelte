<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let options;
	export let value;
	export let css;

	function handleClick(id) {
		value = id;
		dispatch("select", { id });
	}

</script>

<div class={css}>
	{#each options as option (option.id)}
		<button
			css={option.css}
			title={option.title || option.name}
			class:selected={option.id == value}
			on:click={handleClick(option.id)}>
			<slot {option}>
				{#if option.icon}
					<i
						class="icon {option.icon} {!option.name ? 'only' : ''}" />
				{/if}
				{#if option.name}<span class="label">{option.name}</span>{/if}
			</slot>
		</button>
	{/each}
</div>

<style>
	div {
		display: inline-flex;
		flex-wrap: nowrap;
		background: var(--wx-segmented-background);
		border: var(--wx-segmented-border);
		border-radius: var(--wx-segmented-border-radius);
		padding: var(--wx-segmented-padding);
		max-width: 100%;
	}

	button {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		text-decoration: none;
		text-align: center;
		letter-spacing: normal;
		text-transform: var(--wx-button-text-transform);
		font-family: var(--wx-button-font-family);
		font-size: var(--wx-button-font-size);
		line-height: var(--wx-button-line-height);
		font-weight: var(--wx-button-font-weigth);
		padding: var(--wx-button-padding);
		border: var(--wx-button-border);
		border-radius: var(--wx-segmented-border-radius);
		background: transparent;
		color: var(--wx-button-font-color);
		cursor: pointer;
		box-shadow: none;
		transition: none;
		max-width: 100%;
		user-select: none;
	}

	button,
	button:focus,
	button:active {
		outline: none;
	}

	button + button {
		margin-left: var(--wx-segmented-padding);
	}

	button:hover {
		background: var(--wx-segmented-background-hover);
	}

	button.selected,
	button.selected:hover,
	button.selected:focus {
		background: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
		cursor: default;
	}

	.icon {
		position: relative;
		font-size: var(--wx-button-icon-size);
		line-height: 1;
		height: var(--wx-button-line-height);
		opacity: 0.7;
	}
	.icon:before {
		display: block;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	.icon.only {
		opacity: 1;
	}

	.icon + .label {
		margin-left: 4px;
	}

</style>
