<script>
	import { Checkbox, Field, CheckboxGroup } from "../../src/index";

	let options = [
		{ value: 1, label: "Option 1" },
		{ value: 2, label: "Option 2" },
		{ value: 3, label: "Option 3" },
		{ value: 4, label: "Option 4" },
		{ value: 5, label: "Option 5" },
	];

	let v1 = true,
		v2,
		v3 = [3];

	let valueGroup1 = [1, 2];
	let valueGroup2 = [2, 3];
	let valueGroup3 = [3, 4];

	function print(v) {
		return v.join(", ");
	}

</script>

<div class="demo-box">
	<h4>Checkbox</h4>
	Value:
	{v1}
	<p>
		<Checkbox label="Check" value="1" bind:checked={v1} />
	</p>
	Value:
	{v2}
	<p>
		<Checkbox label="Uncheck" value="2" bind:checked={v2} />
	</p>
</div>

<div class="demo-box">
	<h4>Checkbox with a side label</h4>
	<Field label="Checkbox" type="checkbox" position="left" let:id>
		<Checkbox {id} />
	</Field>
	<Field label="Disabled" type="checkbox" position="left" let:id>
		<Checkbox label="Default" disabled {id} />
	</Field>
	<Field label="Disabled" type="checkbox" position="left" let:id>
		<Checkbox label="Checked" disabled {id} value="3" bind:group={v3} />
	</Field>
</div>

<div class="demo-box">
	<h4>Checkbox group: {print(valueGroup1)}</h4>
	<Field label="Check group" position="left" type="checkbox">
		<CheckboxGroup {options} bind:value={valueGroup1} />
	</Field>
</div>

<div class="demo-box">
	<h4>Checkbox group inline: {print(valueGroup2)}</h4>
	<Field label="Check group" position="left" type="checkbox">
		<CheckboxGroup {options} bind:value={valueGroup2} type="inline" />
	</Field>
</div>

<div class="demo-box">
	<h4>Checkbox group grid: {print(valueGroup3)}</h4>
	<Field label="Check group" position="left" type="checkbox">
		<CheckboxGroup {options} bind:value={valueGroup3} type="grid" />
	</Field>
</div>
