<script>
	import { Field, Slider } from "../../src/index";

	let valueA = 50;
	let valueB = 50;
	let valueC = 50;

	function onInput({ detail }) {
		if (detail.input) {
			console.log(
				`Input change from ${detail.previous} to ${detail.value}`
			);
			valueB = detail.value;
		}
	}
	function onChange({ detail }) {
		if (!detail.input) {
			console.log(`Final input change to ${detail.value}`);
			valueC = detail.value;
		}
	}
</script>

<div class="demo-box">
	<h3>Slider</h3>
	<Field label="Updates from binding" position="left" type="slider" let:id>
		<Slider {id} label="Progress: {valueA}%" bind:value={valueA} />
	</Field>
	<Field
		label="Updates from input `change` event"
		position="left"
		type="slider"
		let:id
	>
		<Slider
			{id}
			label="Progress: {valueB}%"
			value={valueB}
			on:change={onInput}
		/>
	</Field>
	<Field
		label="Updates from `change` event"
		position="left"
		type="slider"
		let:id
	>
		<Slider
			{id}
			label="Progress: {valueC}%"
			value={valueC}
			on:change={onChange}
		/>
	</Field>
	<Field label="Disabled" position="left" type="slider" let:id>
		<Slider disabled {id} value={20} />
	</Field>
	<Field label="Unset value" position="left" type="slider" let:id>
		<Slider {id} title="Default slider's value is 0" />
	</Field>
</div>
