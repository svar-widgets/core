<script>
	import { Field, Combo, Button } from "../../src/index";
	import { users } from "../data/userlist";

	import UserOption from "../stubs/UserOption.svelte";

	let value = "";
	const values = [104, 103, 102, ""];
	function changeValue() {
		value = values[(values.indexOf(value) + 1) % values.length];
	}

</script>

<div class="demo-box">
	<h4>Combo with a simple list</h4>
	<Field>
		<Combo options={users} textField="name" let:option value={104}>
			{option.name}
		</Combo>
	</Field>
	<Field label="Disabled">
		<Combo options={users} textField="name" disabled let:option value={104}>
			{option.name}
		</Combo>
	</Field>
	<Field label="Error" error>
		<Combo
			options={users}
			textField="name"
			error
			let:option
			value={104}
			title="Invalid option">
			{option.name}
		</Combo>
	</Field>
</div>
<div class="demo-box">
	<h4>Combo with a dynamic value</h4>

	<Button click={changeValue}>Change the value</Button>
	<Field>
		<Combo options={users} textField="name" let:option {value}>
			{option.name}
		</Combo>
	</Field>
</div>

<div class="demo-box">
	<h4>Combo with a side label</h4>
	<Field label="Owner" position="left" let:id>
		<Combo options={users} textField="name" {id} let:option value={104}>
			{option.name}
		</Combo>
	</Field>
</div>

<div class="demo-box">
	<h4>Combo with a template</h4>
	<Field>
		<Combo options={users} textField="name" let:option value={104}>
			<UserOption data={option} />
		</Combo>
	</Field>
</div>

<div class="demo-box">
	<h4>Combo without a value</h4>
	<Field>
		<Combo options={users} textField="name" />
	</Field>
</div>

<div class="demo-box">
	<h4>Combo without options</h4>
	<Field>
		<Combo />
	</Field>
</div>
