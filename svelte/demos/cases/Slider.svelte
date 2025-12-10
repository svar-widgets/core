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
		<Slider label="Progress: {valueA}%" bind:value={valueA} />
	</Field>
	<Field
		label="Updates from input `change` event"
		position="left"
		type="slider"
	>
		<Slider label="Progress: {valueB}%" value={valueB} onchange={onInput} />
	</Field>
	<Field label="Updates from `change` event" position="left" type="slider">
		<Slider
			label="Progress: {valueC}%"
			value={valueC}
			onchange={onChange}
		/>
	</Field>
	<Field label="Disabled" position="left" type="slider">
		<Slider disabled value={20} />
	</Field>
	<Field label="Unset value" position="left" type="slider">
		<Slider title="Default slider's value is 0" />
	</Field>
</div>
