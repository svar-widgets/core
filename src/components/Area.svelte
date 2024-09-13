<script>
	import { uid } from "@wx/lib-dom";

	export let value = "";
	export let id = uid();
	export let placeholder = "";
	export let title = "";
	export let disabled = false;
	export let error = false;
	export let readonly = false;
</script>

<textarea
	class="wx-textarea"
	bind:value
	{id}
	{disabled}
	{placeholder}
	{readonly}
	class:wx-error={error}
	{title}
/>

<style>
	.wx-textarea {
		display: block;
		resize: vertical;
		width: var(--wx-input-width);
		max-width: 100%;
		padding: var(--wx-input-padding);
		outline: none;
		min-height: 100px;
		font-family: var(--wx-input-font-family);
		font-size: var(--wx-input-font-size);
		line-height: var(--wx-input-line-height);
		font-weight: var(--wx-input-font-weight);
		text-align: var(--wx-input-text-align);
		color: var(--wx-input-font-color);
		border: var(--wx-input-border);
		border-radius: var(--wx-input-border-radius);
		background: var(--wx-input-background);
	}
	.wx-textarea:focus {
		border: var(--wx-input-border-focus);
	}
	.wx-textarea::placeholder {
		color: var(--wx-input-placeholder-color);
	}

	.wx-textarea[disabled] {
		cursor: not-allowed;
		border: var(--wx-input-border-disabled);
		color: var(--wx-color-font-disabled);
		background: var(--wx-input-background-disabled);
		resize: none;
	}
	.wx-textarea[disabled]::placeholder {
		color: var(--wx-color-font-disabled);
	}

	.wx-textarea.wx-error {
		border-color: var(--wx-color-danger);
		color: var(--wx-color-danger);
	}
</style>
