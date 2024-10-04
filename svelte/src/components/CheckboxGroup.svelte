<script>
	import Checkbox from "./Checkbox.svelte";

	export let options = [];
	export let value = [];
	export let type;

	function handleChange(ev) {
		const obj = ev.detail;
		if (obj.value) value = [...value, obj.name];
		else value = value.filter(a => a != obj.name);
	}
</script>

<div class="wx-checkboxgroup wx-{type}">
	{#each options as option}
		<div class="wx-item">
			<Checkbox
				label={option.label}
				name={option.value}
				value={value.includes(option.value)}
				on:change={handleChange}
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

	.wx-checkboxgroup.grid .wx-item {
		flex: 0 0 50%;
		max-width: 50%;
		padding-right: var(--wx-field-gutter);
	}
</style>
