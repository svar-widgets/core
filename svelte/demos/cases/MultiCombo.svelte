<script>
	import { Field, MultiCombo } from "../../src/index";
	import { users } from "../data/userlist";

	import UserOption from "../custom/UserOption.svelte";

	const renderedUsers = [
		{
			id: 103,
			label: "Ned Stark",
			email: "winterhell@gmail.com",
			avatar: "https://docs.webix.com/usermanager-backend/users/103/avatar/491902305.jpg",
		},
		{
			id: 104,
			label: "Lord Varys",
			email: "little.birds@gmail.com",
			avatar: "https://docs.webix.com/usermanager-backend/users/104/avatar/005471511.jpg",
		},
	];
</script>

<div class="demo-box">
	<h3>MultiCombo with a simple list</h3>
	<MultiCombo options={users} value={[104]} />
</div>
<div class="demo-box">
	<h3>MultiCombo with checkboxes</h3>
	<MultiCombo checkboxes={true} options={users} value={[104]} />
</div>

<div class="demo-box">
	<h3>MultiCombo with a side label</h3>
	<Field label="Owner" position="left">
		{#snippet children({ id })}
			<MultiCombo options={users} {id} value={[104]} />
		{/snippet}
	</Field>
	<Field label="Disabled" position="left">
		{#snippet children({ id })}
			<MultiCombo options={users} disabled {id} value={[104]} />
		{/snippet}
	</Field>
	<Field label="Error" error position="left">
		{#snippet children({ id })}
			<MultiCombo
				title="Invalid option"
				options={users}
				error
				{id}
				value={[104]}
			/>
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>MultiCombo with a template</h3>
	<MultiCombo options={users} value={[104]}>
		{#snippet children({ option })}
			<UserOption data={option} />
		{/snippet}
	</MultiCombo>
</div>

<div class="demo-box">
	<h3>MultiCombo with a custom "textField"</h3>
	<MultiCombo options={users} value={[104]} textField="email" />
</div>

<div class="demo-box">
	<h3>MultiCombo without a value</h3>
	<MultiCombo options={users} />
</div>

<div class="demo-box">
	<h3>MultiCombo without options</h3>
	<MultiCombo />
</div>

<div class="demo-box">
	<h3>MultiCombo with hidden options</h3>
	<MultiCombo textOptions={users} options={renderedUsers} value={[87]} />
</div>
