<script>
	import { Field, MultiCombo } from "../../src/index";
	import { users } from "../data/userlist";

	import UserOption from "../custom/UserOption.svelte";
</script>

<div class="demo-box">
	<h3>MultiCombo with a simple list</h3>
	<MultiCombo options={users} textField="name" let:option value={[104]}>
		{option.name}
	</MultiCombo>
</div>
<div class="demo-box">
	<h3>MultiCombo with checkboxes</h3>
	<MultiCombo
		checkboxes={true}
		options={users}
		textField="name"
		let:option
		value={[104]}
	>
		{option.name}
	</MultiCombo>
</div>

<div class="demo-box">
	<h3>MultiCombo with a side label</h3>
	<Field label="Owner" let:id position="left">
		<MultiCombo
			options={users}
			textField="name"
			{id}
			let:option
			value={[104]}
		>
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
			value={[104]}
		>
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
			value={[104]}
		>
			{option.name}
		</MultiCombo>
	</Field>
</div>

<div class="demo-box">
	<h3>MultiCombo with a template</h3>
	<MultiCombo options={users} textField="name" let:option value={[104]}>
		<UserOption data={option} />
	</MultiCombo>
</div>

<div class="demo-box">
	<h3>MultiCombo without a value</h3>
	<MultiCombo options={users} textField="name" />
</div>

<div class="demo-box">
	<h3>MultiCombo without options</h3>
	<MultiCombo />
</div>
