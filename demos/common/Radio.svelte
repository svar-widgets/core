<script>
	import { RadioButton, RadioButtonGroup, Field } from "../../src/index";

	let value = 1;

	let options = [
		{ value: 1, label: "Option 1" },
		{ value: 2, label: "Option 2" },
		{ value: 3, label: "Option 3" },
		{ value: 4, label: "Option 4" },
		{ value: 5, label: "Option 5" },
	];

</script>

<div class="demo-box">
	<h4>RadioButton</h4>
	<Field>
		<RadioButton label="Option 1" value="1" checked={true} name="a1" />
		<RadioButton label="Option 2" value="2" name="a1" />
	</Field>
</div>

<div class="demo-box">
	<h4>RadioButton with a side label</h4>
	<Field label="Radio 1" position="left" type="checkbox" name="a2" let:id>
		<RadioButton {id} />
	</Field>
	<Field label="Radio 2" position="left" type="checkbox" name="a2" let:id>
		<RadioButton {id} />
	</Field>
	<Field label="Disabled" position="left" type="checkbox" let:id>
		<RadioButton label="Default" disabled {id} />
	</Field>
	<Field label="Disabled" position="left" type="checkbox" let:id>
		<RadioButton label="Checked" checked={true} {id} />
	</Field>
</div>

<div class="demo-box">
	<h4>RadioButton group ( {value} )</h4>
	<Field label="Radio group" position="left" type="checkbox">
		<RadioButtonGroup {options} bind:value />
	</Field>
</div>

<div class="demo-box">
	<h4>RadioButton group: inline</h4>
	<Field label="Radio group" position="left" type="checkbox">
		<RadioButtonGroup {options} type="inline" value={3} />
	</Field>
</div>

<div class="demo-box">
	<h4>RadioButton group: grid</h4>
	<Field label="Radio group" position="left" type="checkbox">
		<RadioButtonGroup {options} type="grid" value={4} />
	</Field>
</div>
