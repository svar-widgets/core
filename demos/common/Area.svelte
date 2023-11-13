<script>
	import { Area, Field } from "../../src/index";
	let v1, v2;

</script>

<div class="demo-box">
	<h4>Area with a top label</h4>
	<Field label="Details" let:id>
		<Area bind:value={v1} {id} placeholder="Type here" />
	</Field>
	<Field label="Disabled" let:id>
		<Area bind:value={v1} {id} disabled placeholder="Type here" />
	</Field>
	<Field label="Error" let:id error>
		<Area
			bind:value={v1}
			{id}
			error
			placeholder="Type here"
			title="It can't be empty" />
	</Field>
</div>

<div class="demo-box">
	<h4>Area with a side label</h4>
	<Field label="Details" position="left" let:id>
		<Area bind:value={v2} {id} placeholder="Type here" />
	</Field>
</div>
