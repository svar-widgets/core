<script>
	import { Select, Field } from "../../src/index";
	import { users } from "../data/userlist";

	let v1 = $state(""),
		v2 = $state("");
</script>

<div class="demo-box">
	<h3>Select with a top label</h3>
	<Field label="Details">
		<Select bind:value={v1} options={users} />
	</Field>
</div>

<div class="demo-box">
	<h3>Select with a side label</h3>
	<Field label="Details" position="left">
		<Select bind:value={v2} options={users} />
	</Field>
	<Field label="Disabled" position="left">
		<Select disabled options={users} />
	</Field>
	<Field label="Error" position="left" error>
		<Select error options={users} title="Invalid option" />
	</Field>
</div>
