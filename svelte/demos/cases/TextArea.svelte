<script>
	import { TextArea, Field } from "../../src/index";
	let v1 = $state(""),
		v2 = $state("");
</script>

<div class="demo-box">
	<h3>Area with a top label</h3>
	<Field label="Details">
		<TextArea bind:value={v1} placeholder="Type here" />
	</Field>
	<Field label="Disabled">
		<TextArea bind:value={v1} disabled placeholder="Type here" />
	</Field>
	<Field label="Readonly">
		<TextArea bind:value={v1} readonly placeholder="Type here" />
	</Field>
	<Field label="Error" error>
		<TextArea
			bind:value={v1}
			error
			placeholder="Type here"
			title="It can't be empty"
		/>
	</Field>
</div>

<div class="demo-box">
	<h3>Area with a side label</h3>
	<Field label="Details" position="left">
		<TextArea bind:value={v2} placeholder="Type here" />
	</Field>
</div>
