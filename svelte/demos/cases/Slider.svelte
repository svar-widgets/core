<script>
	import { Field, Slider } from "../../src/index";

	let valueA = $state(50);
	let valueB = $state(50);
	let valueC = $state(50);

	function onInput({ input, value, previous }) {
		if (input) {
			console.log(`Input change from ${previous} to ${value}`);
			valueB = value;
		}
	}
	function onChange({ input, value, previous }) {
		if (!input) {
			console.log(`Final input change from ${previous} to ${value}`);
			valueC = value;
		}
	}
</script>

<div class="demo-box">
	<h3>Slider</h3>
	<Field label="Updates from binding" position="left" type="slider">
		{#snippet children({ id })}
			<Slider {id} label="Progress: {valueA}%" bind:value={valueA} />
		{/snippet}
	</Field>
	<Field
		label="Updates from input `change` event"
		position="left"
		type="slider"
	>
		{#snippet children({ id })}
			<Slider
				{id}
				label="Progress: {valueB}%"
				value={valueB}
				onchange={onInput}
			/>
		{/snippet}
	</Field>
	<Field label="Updates from `change` event" position="left" type="slider">
		{#snippet children({ id })}
			<Slider
				{id}
				label="Progress: {valueC}%"
				value={valueC}
				onchange={onChange}
			/>
		{/snippet}
	</Field>
	<Field label="Disabled" position="left" type="slider">
		{#snippet children({ id })}
			<Slider disabled {id} value={20} />
		{/snippet}
	</Field>
	<Field label="Unset value" position="left" type="slider">
		{#snippet children({ id })}
			<Slider {id} title="Default slider's value is 0" />
		{/snippet}
	</Field>
</div>
