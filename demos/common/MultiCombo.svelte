<script>
	import { Field, MultiCombo } from "../../src/index";
	import { users } from "../data/userlist";

	import UserOption from "../stubs/UserOption.svelte";

</script>

<div class="demo-box">
	<h4>MultiCombo with a simple list</h4>
	<MultiCombo options={users} textField="name" let:option value={[104]}>
		{option.name}
	</MultiCombo>
</div>
<div class="demo-box">
	<h4>MultiCombo with checkboxes</h4>
	<MultiCombo
		checkboxes={true}
		options={users}
		textField="name"
		let:option
		value={[104]}>
		{option.name}
	</MultiCombo>
</div>

<div class="demo-box">
	<h4>MultiCombo with a side label</h4>
	<Field label="Owner" let:id position="left">
		<MultiCombo
			options={users}
			textField="name"
			{id}
			let:option
			value={[104]}>
			{option.name}
		</MultiCombo>
	</Field>
	<Field label="Disabled" let:id position="left">
		<MultiCombo
			options={users}
			textField="name"
			disabled
			{id}
			let:option
			value={[104]}>
			{option.name}
		</MultiCombo>
	</Field>
	<Field label="Error" let:id error position="left">
		<MultiCombo
			title="Invalid option"
			options={users}
			textField="name"
			error
			{id}
			let:option
			value={[104]}>
			{option.name}
		</MultiCombo>
	</Field>
</div>

<div class="demo-box">
	<h4>MultiCombo with a template</h4>
	<MultiCombo options={users} textField="name" let:option value={[104]}>
		<UserOption data={option} />
	</MultiCombo>
</div>

<div class="demo-box">
	<h4>MultiCombo without a value</h4>
	<MultiCombo options={users} textField="name" />
</div>

<div class="demo-box">
	<h4>MultiCombo without options</h4>
	<MultiCombo />
</div>
