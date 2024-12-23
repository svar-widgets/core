<script>
	import { RadioButton, RadioButtonGroup, Field } from "../../src/index";

	let value = $state(1);

	let options = [
		{ id: 1, label: "Option 1" },
		{ id: 2, label: "Option 2" },
		{ id: 3, label: "Option 3" },
		{ id: 4, label: "Option 4" },
		{ id: 5, label: "Option 5" },
	];
</script>

<div class="demo-box">
	<h3>RadioButton</h3>
	<Field>
		<RadioButton label="Option 1" value={true} name="a1" />
		<RadioButton label="Option 2" name="a1" />
	</Field>
</div>

<div class="demo-box">
	<h3>RadioButton with side label</h3>
	<Field label="Radio 1" position="left" type="checkbox">
		{#snippet children({ id })}
			<RadioButton {id} name="a2" />
		{/snippet}
	</Field>
	<Field label="Radio 2" position="left" type="checkbox">
		{#snippet children({ id })}
			<RadioButton {id} name="a2" />
		{/snippet}
	</Field>
	<Field label="Disabled" position="left" type="checkbox">
		{#snippet children({ id })}
			<RadioButton label="Default" disabled {id} name="a2" />
		{/snippet}
	</Field>
	<Field label="Checked" position="left" type="checkbox">
		{#snippet children({ id })}
			<RadioButton label="Checked" value={true} {id} name="a2" />
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>RadioButton group ( {value} )</h3>
	<Field label="Radio group" position="left" type="checkbox">
		<RadioButtonGroup {options} bind:value />
	</Field>
</div>

<div class="demo-box">
	<h3>RadioButton group: inline</h3>
	<Field label="Radio group" position="left" type="checkbox">
		<RadioButtonGroup {options} type="inline" value={3} />
	</Field>
</div>

<div class="demo-box">
	<h3>RadioButton group: grid</h3>
	<Field label="Radio group" position="left" type="checkbox">
		<RadioButtonGroup {options} type="grid" value={4} />
	</Field>
</div>
