<script>
	import { Text, Field } from "../../src/index";
	let v1 = $state(""),
		v2 = $state("");
</script>

<div class="demo-box">
	<h3>Top Fields</h3>
	<Field label="Text">
		<Text bind:value={v1} />
	</Field>
	<Field label="Error" error>
		<Text bind:value={v1} error />
	</Field>
	<Field label="Required" required>
		<Text bind:value={v1} />
	</Field>
</div>
<div class="demo-box">
	<h3>Left Field</h3>
	<Field label="Text" position="left">
		<Text bind:value={v2} />
	</Field>
	<Field label="Error" position="left" error>
		<Text bind:value={v2} error />
	</Field>
	<Field label="Required" position="left" required>
		<Text bind:value={v2} />
	</Field>
</div>
<div class="demo-box">
	<h3>Field with multiple inputs</h3>
	<Field label="Text" position="left">
		<Text bind:value={v1} placeholder="This gets associated label" /><br />
		<Text bind:value={v1} placeholder="This one does not" />
	</Field>
</div>
<div class="demo-box">
	<h3>Nested Field controls</h3>
	<Field label="Each control is associated with its closest Field label">
		<Field label="First Name" position="left">
			<Text />
		</Field>
		<Field label="Last Name" position="left">
			<Text />
		</Field>
	</Field>
</div>
