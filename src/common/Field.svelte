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
	class="field {position}"
	class:error
	style={width ? `width: ${width}` : ''}>
	{#if label}<label for={id}>{label}</label>{/if}
	<div class="field-control {type}">
		<slot {id} />
	</div>
</div>

<style>
	.field {
		width: var(--wx-field-width);
		max-width: 100%;
		margin-bottom: var(--wx-field-gutter);
	}
	.field.left {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-start;
	}
	.field.left > label {
		width: var(--wx-label-width);
		flex-shrink: 0;
		margin: 0 var(--wx-field-gutter) 0 0;
		padding-top: calc(
			(var(--wx-input-height) - var(--wx-label-line-height)) / 2
		);
		text-align: right;
	}
	.field.left > .field-control {
		max-width: calc(100% - var(--wx-label-width) - var(--wx-field-gutter));
	}
	.field.error label {
		color: var(--wx-color-danger);
	}

	.field.left .field-control.checkbox {
		padding-top: calc(
			(var(--wx-input-height) - var(--wx-checkbox-height)) / 2
		);
		padding-bottom: calc(
			(var(--wx-input-height) - var(--wx-checkbox-height)) / 2
		);
	}
	.field.left .field-control.slider {
		padding-top: calc(
			(var(--wx-input-height) - var(--wx-slider-height)) / 2
		);
		padding-bottom: calc(
			(var(--wx-input-height) - var(--wx-slider-height)) / 2
		);
	}
	.field.left .field-control.switch {
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

	.field-control {
		position: relative;
		width: 100%;
	}

</style>
