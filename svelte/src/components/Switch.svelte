<script>
	import { uid } from "@svar-ui/lib-dom";

	let {
		id = uid(),
		value = $bindable(false),
		disabled = false,
		onchange,
	} = $props();

	function onChange(event) {
		value = event.target.checked;
		onchange && onchange({ value });
	}
</script>

<label class="wx-switch">
	<input
		type="checkbox"
		checked={value}
		onchange={onChange}
		{disabled}
		{id}
	/>
	<span></span>
</label>

<style>
	.wx-switch {
		position: relative;
		display: inline-block;
		vertical-align: top;
		margin: 0;
		cursor: default;
	}

	input {
		appearance: none;
		width: 0;
		height: 0;
		opacity: 0;
		position: absolute;
		left: 0;
		top: 0;
		margin: 0;
		padding: 0;
	}

	span {
		display: block;
		position: relative;
		width: var(--wx-switch-width);
		height: var(--wx-switch-height);
		border: var(--wx-switch-border-width) solid
			var(--wx-switch-border-color);
		border-radius: calc(var(--wx-switch-height) / 2);
		background-color: var(--wx-switch-background);
		transition: background-color 0.4s ease;
		cursor: pointer;
		overflow: hidden;
	}

	span:before {
		content: "";
		position: absolute;
		left: var(--wx-switch-thumb-offset);
		top: var(--wx-switch-thumb-offset);
		height: calc(
			var(--wx-switch-height) - var(--wx-switch-thumb-offset) * 2 -
				var(--wx-switch-border-width) * 2
		);
		width: calc(
			var(--wx-switch-height) - var(--wx-switch-thumb-offset) * 2 -
				var(--wx-switch-border-width) * 2
		);
		border: var(--wx-switch-thumb-border);
		border-radius: 50%;
		background: var(--wx-switch-thumb-background);
		box-shadow: var(--wx-switch-thumb-shadow);
		transition: transform 0.4s ease;
	}

	input:checked ~ span {
		background-color: var(--wx-switch-primary);
	}

	input:checked ~ span:before {
		transform: translateX(
			calc(var(--wx-switch-width) - var(--wx-switch-height))
		);
	}

	input[disabled] ~ span {
		background-color: var(--wx-color-disabled);
		border-color: var(--wx-switch-border-color-disabled);
		cursor: not-allowed;
	}
	input[disabled] ~ span:before {
		border: var(--wx-switch-thumb-border-disabled);
		background: var(--wx-switch-thumb-background-disabled);
	}
</style>
