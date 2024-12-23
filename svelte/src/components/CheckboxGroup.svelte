<script>
	import Checkbox from "./Checkbox.svelte";

	let { options = [], value = $bindable([]), type = "", onchange } = $props();

	function handleChange(obj) {
		if (obj.value) value = [...value, obj.inputValue];
		else value = value.filter(a => a != obj.inputValue);
		onchange && onchange({ value });
	}
</script>

<div class="wx-checkboxgroup {type && `wx-${type}`}">
	{#each options as option}
		<div class="wx-item">
			<Checkbox
				label={option.label}
				inputValue={option.id}
				value={value.includes(option.id)}
				onchange={handleChange}
			/>
		</div>
	{/each}
</div>

<style>
	.wx-checkboxgroup {
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

	.wx-checkboxgroup.wx-inline .wx-item {
		flex: none;
		padding-right: var(--wx-field-gutter);
	}

	.wx-checkboxgroup.wx-grid .wx-item {
		flex: 0 0 50%;
		max-width: 50%;
		padding-right: var(--wx-field-gutter);
	}
</style>
