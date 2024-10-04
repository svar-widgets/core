<script>
	import { Select, Field } from "../../src/index";
	import { users } from "../data/userlist";

	let v1, v2;
</script>

<div class="demo-box">
	<h3>Select with a top label</h3>
	<Field label="Details" let:id>
		<Select bind:value={v1} {id} options={users} label={"name"} />
	</Field>
</div>

<div class="demo-box">
	<h3>Select with a side label</h3>
	<Field label="Details" position="left" let:id>
		<Select bind:value={v2} {id} options={users} label="name" />
	</Field>
	<Field label="Disabled" position="left" let:id>
		<Select {id} disabled options={users} label={"name"} />
	</Field>
	<Field label="Error" position="left" error let:id>
		<Select
			{id}
			error
			options={users}
			label={"name"}
			title="Invalid option"
		/>
	</Field>
</div>
