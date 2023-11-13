<script>
	import { Text, Field } from "../../src/index";
	let v1, v2;

</script>

<div class="demo-box">
	<h4>Left Field</h4>
	<Field label="Text" position="left" let:id>
		<Text bind:value={v1} {id} />
	</Field>
</div>

<div class="demo-box">
	<h4>Top Field</h4>
	<Field label="Text" let:id>
		<Text bind:value={v2} {id} />
	</Field>
</div>

<div class="demo-box">
	<h4>Top Field</h4>
	<Field label="Text" let:id error>
		<Text bind:value={v2} {id} error />
	</Field>
</div>
