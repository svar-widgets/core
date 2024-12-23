<script>
	import { Text, Field } from "../../src/index";
	let v1 = $state(""),
		v2 = $state("");
</script>

<div class="demo-box">
	<h3>Top Fields</h3>
	<Field label="Text">
		{#snippet children({ id })}
			<Text bind:value={v1} {id} />
		{/snippet}
	</Field>
	<Field label="Error" error>
		{#snippet children({ id })}
			<Text bind:value={v1} {id} error />
		{/snippet}
	</Field>
	<Field label="Required" required>
		{#snippet children({ id })}
			<Text bind:value={v1} {id} />
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>Left Field</h3>
	<Field label="Text" position="left">
		{#snippet children({ id })}
			<Text bind:value={v2} {id} />
		{/snippet}
	</Field>
	<Field label="Error" position="left" error>
		{#snippet children({ id })}
			<Text bind:value={v2} {id} error />
		{/snippet}
	</Field>
	<Field label="Required" position="left" required>
		{#snippet children({ id })}
			<Text bind:value={v2} {id} />
		{/snippet}
	</Field>
</div>
