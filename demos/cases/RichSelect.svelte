<script>
	import { Field, RichSelect } from "../../src/index";
	import { users } from "../data/userlist";

	import UserOption from "../custom/UserOption.svelte";
</script>

<div class="demo-box">
	<h3>RichSelect with a simple list</h3>
	<Field>
		<RichSelect options={users} let:option value={104}>
			{option.name}
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h3>RichSelect with a side label</h3>
	<Field label="Owner" position="left" let:id>
		<RichSelect options={users} {id} let:option value={104}>
			{option.name}
		</RichSelect>
	</Field>
	<Field label="Disabled" position="left" let:id>
		<RichSelect options={users} {id} disabled let:option value={104}>
			{option.name}
		</RichSelect>
	</Field>
	<Field label="Error" position="left" error let:id>
		<RichSelect
			options={users}
			{id}
			error
			let:option
			value={104}
			title="Invalid option"
		>
			{option.name}
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h3>RichSelect overflow</h3>
	<Field width="150px">
		<RichSelect options={users} value={105} />
		<br />
		<RichSelect options={users} let:option value={105}>
			{option.name}
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h3>RichSelect with a template</h3>
	<Field>
		<RichSelect options={users} let:option value={104}>
			<UserOption data={option} />
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h3>RichSelect without a value</h3>
	<RichSelect options={users} />
</div>

<div class="demo-box">
	<h3>RichSelect without options</h3>
	<RichSelect />
</div>
