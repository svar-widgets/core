<script>
	import { uid } from "@wx/lib-dom";

	export let label = "";
	export let position = "";
	export let width = "";
	export let error = false;
	export let type = "";

	let id = uid();
</script>

<div
	class="wx-field wx-{position}"
	class:wx-error={error}
	style={width ? `width: ${width}` : ""}
>
	{#if label}<label for={id}>{label}</label>{/if}
	<div class="wx-field-control wx-{type}">
		<slot {id} />
	</div>
</div>

<style>
	.wx-field {
		width: var(--wx-field-width);
		max-width: 100%;
		margin-bottom: var(--wx-field-gutter);
	}
	.wx-field.wx-left {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-start;
	}
	.wx-field.wx-left > label {
		width: var(--wx-label-width);
		flex-shrink: 0;
		margin: 0 var(--wx-field-gutter) 0 0;
		padding-top: calc(
			(var(--wx-input-height) - var(--wx-label-line-height)) / 2
		);
		text-align: right;
	}
	.wx-field.wx-left > .wx-field-control {
		max-width: calc(100% - var(--wx-label-width) - var(--wx-field-gutter));
	}
	.wx-field.wx-error label {
		color: var(--wx-color-danger);
	}

	.wx-field.wx-left .wx-field-control.wx-checkbox {
		padding-top: calc(
			(var(--wx-input-height) - var(--wx-checkbox-height)) / 2
		);
		padding-bottom: calc(
			(var(--wx-input-height) - var(--wx-checkbox-height)) / 2
		);
	}
	.wx-field.wx-left .wx-field-control.wx-slider {
		padding-top: calc(
			(var(--wx-input-height) - var(--wx-slider-height)) / 2
		);
		padding-bottom: calc(
			(var(--wx-input-height) - var(--wx-slider-height)) / 2
		);
	}
	.wx-field.wx-left .wx-field-control.wx-switch {
		padding-top: calc(
			(var(--wx-input-height) - var(--wx-switch-height)) / 2
		);
		padding-bottom: calc(
			(var(--wx-input-height) - var(--wx-switch-height)) / 2
		);
	}

	label {
		display: block;
		margin: var(--wx-label-margin);
		padding: var(--wx-label-padding);
		font-family: var(--wx-label-font-family);
		font-size: var(--wx-label-font-size);
		line-height: var(--wx-label-line-height);
		font-weight: var(--wx-label-font-weight);
		color: var(--wx-label-font-color);
	}

	.wx-field-control {
		position: relative;
		width: 100%;
	}
</style>
