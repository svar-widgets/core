<script>
	import { uid } from "wx-lib-dom";
	export let label = "label";
	export let value = "";
	export let options = [];
	export let placeholder = "";
	export let title;
	export let disabled = false;
	export let error = false;

	export let id = uid();
</script>

<div class="wx-select">
	<select {id} bind:value {disabled} class:wx-error={error} {title}>
		{#each options as option (option.id)}
			<option value={option.id}>{option[label]}</option>
		{/each}
	</select>
	{#if !value && value !== 0}
		<div class="wx-placeholder">{placeholder}</div>
	{/if}
	<i class="wx-icon wxi-angle-down" />
</div>

<style>
	.wx-select {
		position: relative;
		width: var(--wx-input-width);
	}

	select {
		appearance: none;
		display: block;
		width: 100%;
		height: var(--wx-input-height);
		outline: none;
		background: var(--wx-input-background);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		padding: var(--wx-input-padding);
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
		overflow: hidden !important;
		text-overflow: ellipsis;
		cursor: pointer;
	}
	select:focus {
		border: var(--wx-input-border-focus);
	}
	select[disabled] {
		cursor: not-allowed;
		border: var(--wx-input-border-disabled);
		color: var(--wx-color-font-disabled);
		background: var(--wx-input-background-disabled);
	}
	select[disabled] ~ .wx-placeholder {
		color: var(--wx-color-font-disabled);
	}
	select[disabled] ~ .wx-icon {
		color: var(--wx-color-font-disabled);
	}
	select.wx-error {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}
	select.wx-error option {
		color: var(--wx-input-font-color);
	}
	select.wx-error ~ .wx-icon {
		color: var(--wx-color-danger);
	}

	.wx-placeholder {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		border: var(--wx-input-border);
		border-color: transparent;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-placeholder-color);
		padding: var(--wx-input-padding);
		padding-right: calc(
			var(--wx-input-icon-size) + var(--wx-input-icon-indent) * 2
		);
		white-space: nowrap;
		overflow: hidden !important;
		text-overflow: ellipsis;
		cursor: pointer;
		pointer-events: none;
	}

	.wx-icon {
		position: absolute;
		right: var(--wx-input-icon-indent);
		top: 50%;
		transform: translateY(-50%);
		font-size: var(--wx-input-icon-size);
		line-height: 1;
		width: var(--wx-input-icon-size);
		height: var(--wx-input-icon-size);
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
		user-select: none;
		color: var(--wx-input-icon-color);
	}
	.wx-icon:before {
		display: block;
	}
</style>
