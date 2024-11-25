<script>
	import { Field, MultiCombo } from "../../src/index";
	import { users } from "../data/userlist";

	import UserOption from "../custom/UserOption.svelte";
</script>

<div class="demo-box">
	<h3>MultiCombo with a simple list</h3>
	<MultiCombo options={users} textField="name" value={[104]}>
		{#snippet children({ option })}
			{option.name}
		{/snippet}
	</MultiCombo>
</div>
<div class="demo-box">
	<h3>MultiCombo with checkboxes</h3>
	<MultiCombo
		checkboxes={true}
		options={users}
		textField="name"
		value={[104]}
	>
		{#snippet children({ option })}
			{option.name}
		{/snippet}
	</MultiCombo>
</div>

<div class="demo-box">
	<h3>MultiCombo with a side label</h3>
	<Field label="Owner" position="left">
		{#snippet children({ id })}
			<MultiCombo options={users} textField="name" {id} value={[104]}>
				{#snippet children({ option })}
					{option.name}
				{/snippet}
			</MultiCombo>
		{/snippet}
	</Field>
	<Field label="Disabled" position="left">
		{#snippet children({ id })}
			<MultiCombo
				options={users}
				textField="name"
				disabled
				{id}
				value={[104]}
			>
				{#snippet children({ option })}
					{option.name}
				{/snippet}
			</MultiCombo>
		{/snippet}
	</Field>
	<Field label="Error" error position="left">
		{#snippet children({ id })}
			<MultiCombo
				title="Invalid option"
				options={users}
				textField="name"
				error
				{id}
				value={[104]}
			>
				{#snippet children({ option })}
					{option.name}
				{/snippet}
			</MultiCombo>
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>MultiCombo with a template</h3>
	<MultiCombo options={users} textField="name" value={[104]}>
		{#snippet children({ option })}
			<UserOption data={option} />
		{/snippet}
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
