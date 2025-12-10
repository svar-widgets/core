<script>
	import { Checkbox, Field, CheckboxGroup } from "../../src/index";

	let options = [
		{ id: 1, label: "Option 1" },
		{ id: 2, label: "Option 2" },
		{ id: 3, label: "Option 3" },
		{ id: 4, label: "Option 4" },
		{ id: 5, label: "Option 5" },
	];

	let v1 = $state(true),
		v2 = $state(false),
		v3 = $state(true);

	let valueGroup1 = $state([1, 2]);
	let valueGroup2 = $state([2, 3]);
	let valueGroup3 = $state([3, 4]);

	function print(v) {
		return v.join(", ");
	}
</script>

<div class="demo-box">
	<h3>Checkbox</h3>
	Value:
	{v1}
	<p>
		<Checkbox label="Check" bind:value={v1} />
	</p>
	Value:
	{v2}
	<p>
		<Checkbox label="Uncheck" bind:value={v2} />
	</p>
</div>

<div class="demo-box">
	<h3>Checkbox with a side label</h3>
	<Field label="Checkbox" type="checkbox" position="left">
		<Checkbox />
	</Field>
	<Field label="Disabled" type="checkbox" position="left">
		<Checkbox label="Default" disabled />
	</Field>
	<Field label="Disabled" type="checkbox" position="left">
		<Checkbox label="Checked" disabled bind:value={v3} />
	</Field>
</div>

<div class="demo-box">
	<h3>Checkbox group: {print(valueGroup1)}</h3>
	<Field label="Check group" position="left" type="checkbox">
		<CheckboxGroup {options} bind:value={valueGroup1} />
	</Field>
</div>

<div class="demo-box">
	<h3>Checkbox group inline: {print(valueGroup2)}</h3>
	<Field label="Check group" position="left" type="checkbox">
		<CheckboxGroup {options} bind:value={valueGroup2} type="inline" />
	</Field>
</div>

<div class="demo-box">
	<h3>Checkbox group grid: {print(valueGroup3)}</h3>
	<Field label="Check group" position="left" type="checkbox">
		<CheckboxGroup {options} bind:value={valueGroup3} type="grid" />
	</Field>
</div>
