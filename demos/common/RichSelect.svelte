<script>
	import { Field, RichSelect } from "../../src/index";
	import { users } from "../data/userlist";

	import UserOption from "../stubs/UserOption.svelte";

</script>

<div class="demo-box">
	<h4>RichSelect with a simple list</h4>
	<Field>
		<RichSelect options={users} let:option value={104}>
			{option.name}
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h4>RichSelect with a side label</h4>
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
			title="Invalid option">
			{option.name}
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h4>RichSelect overflow</h4>
	<Field width="150px">
		<RichSelect options={users} value={105} />
		<br />
		<RichSelect options={users} let:option value={105}>
			{option.name}
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h4>RichSelect with a template</h4>
	<Field>
		<RichSelect options={users} let:option value={104}>
			<UserOption data={option} />
		</RichSelect>
	</Field>
</div>

<div class="demo-box">
	<h4>RichSelect without a value</h4>
	<RichSelect options={users} />
</div>

<div class="demo-box">
	<h4>RichSelect without options</h4>
	<RichSelect />
</div>
