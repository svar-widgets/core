<script>
	let {
		type = "",
		css = "",
		icon = "",
		disabled = false,
		title = "",
		text = "",
		children,
		onclick,
	} = $props();

	let buttonCss = $derived.by(() => {
		let cssType = type
			? type
					.split(" ")
					.filter(a => a !== "")
					.map(x => "wx-" + x)
					.join(" ")
			: "";
		return css + (css ? " " : "") + cssType;
	});

	const handleClick = ev => {
		onclick && onclick(ev);
	};
</script>

<button
	{title}
	class={`wx-button ${buttonCss}`}
	class:wx-icon={icon && !children}
	{disabled}
	onclick={handleClick}
>
	{#if icon}<i class={icon}></i>{/if}
	{#if children}{@render children()}{:else}{text}{/if}
</button>

<style>
	.wx-button {
		display: inline-block;
		vertical-align: top;
		text-decoration: none;
		text-align: center;
		letter-spacing: normal;
		text-transform: var(--wx-button-text-transform);
		font-family: var(--wx-button-font-family);
		font-size: var(--wx-button-font-size);
		line-height: var(--wx-button-line-height);
		font-weight: var(--wx-button-font-weight);
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

	.wx-button:hover {
		background-image: linear-gradient(
			rgba(0, 0, 0, 0.1) 0%,
			rgba(0, 0, 0, 0.1) 100%
		);
	}

	.wx-button,
	.wx-button:focus,
	.wx-button:active {
		outline: none;
	}

	.wx-button:active:not(:global([disabled])) {
		opacity: 0.8;
	}

	.wx-button[disabled] {
		cursor: not-allowed;
		background: var(--wx-color-disabled);
		border-color: transparent;
		color: var(--wx-color-font-disabled);
	}

	.wx-block {
		display: block;
		width: 100%;
	}

	.wx-square {
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

	.wx-icon {
		padding-left: var(--wx-button-icon-indent);
		padding-right: var(--wx-button-icon-indent);
		min-width: auto;
	}
	.wx-icon i {
		margin: 0;
		opacity: 1;
	}

	.wx-primary {
		background-color: var(--wx-color-primary);
		color: var(--wx-color-primary-font);
	}

	.wx-secondary {
		background: var(--wx-color-secondary);
		color: var(--wx-color-secondary-font);
		border-color: var(--wx-color-secondary-border);
	}
	.wx-secondary:hover:not(:global([disabled])),
	.wx-secondary.wx-pressed:not(:global([disabled])),
	.wx-secondary.wx-pressed:hover:not(:global([disabled])),
	.wx-secondary.wx-pressed:active:not(:global([disabled])) {
		background: var(--wx-color-secondary-hover);
		color: var(--wx-color-secondary-font-hover);
	}
	.wx-secondary[disabled] {
		border-color: var(--wx-color-secondary-border-disabled);
	}

	.wx-danger {
		background-color: var(--wx-color-danger);
		color: var(--wx-button-danger-font-color);
	}

	.wx-link {
		color: var(--wx-color-link);
		padding: 0;
		border: none;
		vertical-align: baseline;
	}
	.wx-link,
	.wx-link:hover,
	.wx-link[disabled] {
		background: transparent;
	}
	.wx-link[disabled] {
		color: var(--wx-color-font-disabled);
	}

	.wx-pressed,
	.wx-pressed:hover,
	.wx-pressed:active,
	.wx-pressed[disabled] {
		opacity: 0.8;
		background-image: linear-gradient(
			rgba(0, 0, 0, 0.1) 0%,
			rgba(0, 0, 0, 0.1) 100%
		);
		box-shadow: inset 0 2px 2px 1px rgba(0, 0, 0, 0.15);
	}
</style>
