<script>
	import { uid } from "@wx/lib-dom";
	import RadioButton from "./RadioButton.svelte";

	export let options = [{}];
	export let value;
	export let type;

	const name = uid();

</script>

<div class="group {type}">
	{#each options as option}
		<div class="group-item">
			<RadioButton
				label={option.label}
				value={option.value}
				checked={value === option.value}
				bind:groupValue={value}
				{name} />
		</div>
	{/each}
</div>

<style>
	.group {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: flex-start;
		margin-top: calc(var(--wx-field-gutter) * -1);
	}
	.group-item {
		flex: 0 0 100%;
		max-width: 100%;
		margin-top: var(--wx-field-gutter);
	}

	.group.inline .group-item {
		flex: none;
		padding-right: var(--wx-field-gutter);
	}

	.group.grid .group-item {
		flex: 0 0 50%;
		max-width: 50%;
		padding-right: var(--wx-field-gutter);
	}

</style>
