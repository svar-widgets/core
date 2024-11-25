<script>
	import { Field, Combo, Button } from "../../src/index";
	import { users } from "../data/userlist";

	import UserOption from "../custom/UserOption.svelte";

	let value = $state("");
	const values = [104, 103, 102, ""];
	function changeValue() {
		value = values[(values.indexOf(value) + 1) % values.length];
	}
</script>

<div class="demo-box">
	<h3>Combo with a simple list</h3>
	<Field>
		<Combo options={users} textField="name" value={104}>
			{#snippet children({ option })}
				{option.name}
			{/snippet}
		</Combo>
	</Field>
	<Field label="Disabled">
		<Combo options={users} textField="name" disabled value={104}>
			{#snippet children({ option })}
				{option.name}
			{/snippet}
		</Combo>
	</Field>
	<Field label="Error" error>
		<Combo
			options={users}
			textField="name"
			error
			value={104}
			title="Invalid option"
		>
			{#snippet children({ option })}
				{option.name}
			{/snippet}
		</Combo>
	</Field>
</div>
<div class="demo-box">
	<h3>Combo with a dynamic value</h3>

	<Button onclick={changeValue}>Change the value</Button>
	<Field>
		<Combo options={users} textField="name" {value}>
			{#snippet children({ option })}
				{option.name}
			{/snippet}
		</Combo>
	</Field>
</div>

<div class="demo-box">
	<h3>Combo with a side label</h3>
	<Field label="Owner" position="left">
		{#snippet children({ id })}
			<Combo options={users} textField="name" {id} value={104}>
				{#snippet children({ option })}
					{option.name}
				{/snippet}
			</Combo>
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>Combo with a template</h3>
	<Field>
		<Combo options={users} textField="name" value={104}>
			{#snippet children({ option })}
				<UserOption data={option} />
			{/snippet}
		</Combo>
	</Field>
</div>

<div class="demo-box">
	<h3>Combo without a value</h3>
	<Field>
		<Combo options={users} textField="name" />
	</Field>
</div>

<div class="demo-box">
	<h3>Combo without options</h3>
	<Field>
		<Combo />
	</Field>
</div>

<div class="demo-box">
	<h3>Combo with clear button</h3>
	<Field>
		<Combo options={users} value={104} textField="name" clearButton />
	</Field>
</div>
