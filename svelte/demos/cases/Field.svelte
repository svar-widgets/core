<script>
	import { Text, Field } from "../../src/index";
	let v1, v2;
</script>

<div class="demo-box">
	<h3>Left Field</h3>
	<Field label="Text" position="left" let:id>
		<Text bind:value={v1} {id} />
	</Field>
</div>

<div class="demo-box">
	<h3>Top Field</h3>
	<Field label="Text" let:id>
		<Text bind:value={v2} {id} />
	</Field>
</div>

<div class="demo-box">
	<h3>Top Field</h3>
	<Field label="Text" let:id error>
		<Text bind:value={v2} {id} error />
	</Field>
</div>
