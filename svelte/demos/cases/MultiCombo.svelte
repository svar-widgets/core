<script>
	import { Field, MultiCombo } from "../../src/index";
	import { users } from "../data/userlist";

	import UserOption from "../custom/UserOption.svelte";

	const renderedUsers = [
		{
			id: 103,
			label: "Ned Stark",
			email: "winterhell@gmail.com",
			avatar: "https://cdn.svar.dev/demos/assets/avatar/491902305.jpg",
		},
		{
			id: 104,
			label: "Lord Varys",
			email: "little.birds@gmail.com",
			avatar: "https://cdn.svar.dev/demos/assets/avatar/005471511.jpg",
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
		<MultiCombo options={users} value={[104]} />
	</Field>
	<Field label="Disabled" position="left">
		<MultiCombo options={users} disabled value={[104]} />
	</Field>
	<Field label="Error" error position="left">
		<MultiCombo
			title="Invalid option"
			options={users}
			error
			value={[104]}
		/>
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
