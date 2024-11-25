<script>
	import { Select, Field } from "../../src/index";
	import { users } from "../data/userlist";

	let v1 = $state(""),
		v2 = $state("");
</script>

<div class="demo-box">
	<h3>Select with a top label</h3>
	<Field label="Details">
		{#snippet children({ id })}
			<Select bind:value={v1} {id} options={users} label={"name"} />
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>Select with a side label</h3>
	<Field label="Details" position="left">
		{#snippet children({ id })}
			<Select bind:value={v2} {id} options={users} label="name" />
		{/snippet}
	</Field>
	<Field label="Disabled" position="left">
		{#snippet children({ id })}
			<Select {id} disabled options={users} label={"name"} />
		{/snippet}
	</Field>
	<Field label="Error" position="left" error>
		{#snippet children({ id })}
			<Select
				{id}
				error
				options={users}
				label={"name"}
				title="Invalid option"
			/>
		{/snippet}
	</Field>
</div>
