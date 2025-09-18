<script>
	let {
		options = [],
		value = $bindable(""),
		type = "top",
		onchange,
	} = $props();
</script>

<div class="wx-tabs wx-{type}">
	{#each options as option}
		<button
			class:wx-active={option.id == value}
			title={option.title}
			onclick={() => {
				value = option.id;
				onchange && onchange({ value });
			}}
		>
			{#if option.icon}
				<i
					class="wx-icon {option.icon} {!option.label
						? 'wx-only'
						: ''}"
				></i>
			{/if}
			{#if option.label}<span class="wx-label">{option.label}</span>{/if}
		</button>
	{/each}
</div>

<style>
	.wx-tabs {
		display: inline-flex;
		flex-wrap: nowrap;
	}

	button {
		position: relative;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
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
		border-width: var(--wx-tabs-border-width);
		border-radius: 0;
		background: var(--wx-tabs-background);
		color: var(--wx-button-font-color);
		cursor: pointer;
		box-shadow: none;
		transition: none;
		max-width: 100%;
		min-width: var(--wx-tabs-cell-min-width);
		user-select: none;
	}

	button + button:before {
		content: "";
		display: block;
		position: absolute;
		left: calc(
			var(--wx-tabs-border-width) * -1 - var(--wx-tabs-divider-width) / 2
		);
		top: 50%;
		transform: translateY(-50%);
		width: 0;
		height: calc(
			var(--wx-tabs-border-width) * 2 + var(--wx-tabs-divider-height)
		);
		border-left: var(--wx-tabs-divider-width) solid
			var(--wx-tabs-divider-color);
	}

	button:first-child {
		border-top-left-radius: var(--wx-tabs-border-radius);
		border-bottom-left-radius: var(--wx-tabs-border-radius);
	}
	button:last-child {
		border-top-right-radius: var(--wx-tabs-border-radius);
		border-bottom-right-radius: var(--wx-tabs-border-radius);
	}

	button,
	button:focus,
	button:active {
		outline: none;
	}

	button:hover {
		background: var(--wx-tabs-background-hover);
	}

	button.wx-active,
	button.wx-active:hover,
	button.wx-active:focus {
		background: var(--wx-tabs-active-background);
		color: var(--wx-tabs-active-color);
		cursor: default;
	}
	button.wx-active:before {
		display: none;
	}
	button.wx-active + button:before {
		display: none;
	}

	button.wx-active:after,
	button:hover:after {
		content: "";
		display: block;
		position: absolute;
		left: 13px;
		height: 0;
		width: calc(100% - 26px);
	}

	button.wx-active:after {
		border-bottom: 2px solid var(--wx-tabs-active-border);
	}

	button:not(:global(.wx-active)):hover:after {
		border-bottom: 2px solid var(--wx-tabs-hover-border);
	}

	.wx-top button.wx-active:after,
	.wx-top button:hover:after {
		top: 100%;
	}

	.wx-bottom button.wx-active:after,
	.wx-bottom button:hover:after {
		top: 0;
	}

	.wx-icon {
		position: relative;
		font-size: var(--wx-button-icon-size);
		line-height: 1;
		height: var(--wx-button-line-height);
		opacity: 0.7;
	}
	.wx-icon:before {
		display: block;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	.wx-icon.wx-only {
		opacity: 1;
	}

	.wx-icon + .wx-label {
		margin-left: 4px;
	}
</style>
