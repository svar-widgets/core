<script>
	let { onclick, children } = $props();
</script>

<button {onclick}>
	{@render children?.()}
</button>

<style>
	button {
		display: inline-block;
		vertical-align: top;
		text-decoration: none;
		text-align: center;
		letter-spacing: normal;
		font-family: var(--wx-calendar-controls-font-family);
		font-size: var(--wx-calendar-controls-font-size);
		line-height: var(--wx-calendar-controls-line-height);
		font-weight: var(--wx-calendar-controls-font-weight);
		text-transform: none;
		padding: 0;
		border: none;
		border-radius: 0;
		background: transparent;
		color: var(--wx-calendar-controls-font-color);
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
	button:active {
		opacity: 0.8;
	}
</style>
