<script>
	import { uid } from "@svar-ui/lib-dom";
	import RadioButton from "./RadioButton.svelte";

	let {
		options = [{}],
		value = $bindable(""),
		type = "",
		onchange,
	} = $props();

	const name = uid();

	function handleChange(ev) {
		value = ev.inputValue;
		onchange && onchange({ value });
	}
</script>

<div class="wx-radiogroup {type && `wx-${type}`}">
	{#each options as option}
		<div class="wx-item">
			<RadioButton
				label={option.label}
				inputValue={option.id}
				value={value === option.id}
				{name}
				onchange={handleChange}
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
