<script>
	import { createEventDispatcher } from "svelte";

	export let type = "";
	export let css = "";
	export let click;
	export let icon = "";
	export let disabled = false;
	export let title = "";
	export let text = "";

	const SLOTS = $$props.$$slots;

	let buttonCss;
	$: buttonCss = css + (type ? (css ? " " : "") + type : "");

	const dispatch = createEventDispatcher();
	const handleClick = ev => {
		if (disabled) return;
		dispatch("click");
		if (click) click(ev);
	};

</script>

<button
	{title}
	class={buttonCss}
	class:icon={icon && (!SLOTS || !SLOTS.default)}
	{disabled}
	on:click={handleClick}>
	{#if icon}<i class={icon} />{/if}
	{#if SLOTS}
		<slot />
	{:else}{text}{/if}
</button>

<style>
	button {
		display: inline-block;
		vertical-align: top;
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
		border-radius: var(--wx-button-border-radius);
		background-color: var(--wx-button-background);
		color: var(--wx-button-font-color);
		cursor: pointer;
		box-shadow: none;
		transition: none;
		max-width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		user-select: none;
		min-width: var(--wx-button-width);
	}

	button:hover {
		background-image: linear-gradient(
			rgba(0, 0, 0, 0.1) 0%,
			rgba(0, 0, 0, 0.1) 100%
		);
	}

	button,
	button:focus,
	button:active {
		outline: none;
	}

	button:active:not([disabled]) {
		opacity: 0.8;
	}

	button[disabled] {
		cursor: not-allowed;
		background: var(--wx-color-disabled);
		border-color: transparent;
		color: var(--wx-color-font-disabled);
	}

	.block {
		display: block;
		width: 100%;
	}

	.square {
		border-radius: 0;
	}

	i {
		position: relative;
		display: inline-block;
		vertical-align: top;
		font-size: var(--wx-button-icon-size);
		line-height: 1;
		height: var(--wx-button-line-height);
		margin-right: 2px;
		opacity: 0.7;
	}
	i:before {
		display: block;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}

	.icon {
		padding-left: var(--wx-button-icon-indent);
		padding-right: var(--wx-button-icon-indent);
		min-width: auto;
	}
	.icon i {
		margin: 0;
		opacity: 1;
	}

	.primary {
		background-color: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	}

	.secondary {
		background: var(--wx-color-secondary);
		color: var(--wx-color-secondary-font);
		border-color: var(--wx-color-secondary-border);
	}
	.secondary:hover:not([disabled]),
	.secondary.pressed:not([disabled]),
	.secondary.pressed:hover:not([disabled]),
	.secondary.pressed:active:not([disabled]) {
		background: var(--wx-color-secondary-hover);
		color: var(--wx-color-secondary-font-hover);
	}
	.secondary[disabled] {
		border-color: var(--wx-color-secondary-border-disabled);
	}

	.danger {
		background-color: var(--wx-color-danger);
		color: var(--wx-button-danger-font-color);
	}

	.link {
		color: var(--wx-color-link);
		padding: 0;
		border: none;
		vertical-align: baseline;
	}
	.link,
	.link:hover,
	.link[disabled] {
		background: transparent;
	}
	.link[disabled] {
		color: var(--wx-color-font-disabled);
	}

	.pressed,
	.pressed:hover,
	.pressed:active,
	.pressed[disabled] {
		opacity: 0.8;
		background-image: linear-gradient(
			rgba(0, 0, 0, 0.1) 0%,
			rgba(0, 0, 0, 0.1) 100%
		);
		box-shadow: inset 0 2px 2px 1px rgba(0, 0, 0, 0.15);
	}

</style>
