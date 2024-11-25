<script>
	import { uid } from "wx-lib-dom";
	import RadioButton from "./RadioButton.svelte";

	let { options = [{}], value = $bindable(""), type = "" } = $props();

	const name = uid();
</script>

<div class="wx-radiogroup {type && `wx-${type}`}">
	{#each options as option}
		<div class="wx-item">
			<RadioButton
				label={option.label}
				value={option.value}
				checked={value === option.value}
				bind:groupValue={value}
				{name}
			/>
		</div>
	{/each}
</div>

<style>
	.wx-radiogroup {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: flex-start;
		margin-top: calc(var(--wx-field-gutter) * -1);
	}
	.wx-item {
		flex: 0 0 100%;
		max-width: 100%;
		margin-top: var(--wx-field-gutter);
	}

	.wx-radiogroup.wx-inline .wx-item {
		flex: none;
		padding-right: var(--wx-field-gutter);
	}

	.wx-radiogroup.wx-grid .wx-item {
		flex: 0 0 50%;
		max-width: 50%;
		padding-right: var(--wx-field-gutter);
	}
</style>
