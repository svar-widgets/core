<script>
	import { Area, Field } from "../../src/index";
	let v1 = $state(""),
		v2 = $state("");
</script>

<div class="demo-box">
	<h3>Area with a top label</h3>
	<Field label="Details">
		{#snippet children({ id })}
			<Area bind:value={v1} {id} placeholder="Type here" />
		{/snippet}
	</Field>
	<Field label="Disabled">
		{#snippet children({ id })}
			<Area bind:value={v1} {id} disabled placeholder="Type here" />
		{/snippet}
	</Field>
	<Field label="Readonly">
		{#snippet children({ id })}
			<Area bind:value={v1} {id} readonly placeholder="Type here" />
		{/snippet}
	</Field>
	<Field label="Error" error>
		{#snippet children({ id })}
			<Area
				bind:value={v1}
				{id}
				error
				placeholder="Type here"
				title="It can't be empty"
			/>
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>Area with a side label</h3>
	<Field label="Details" position="left">
		{#snippet children({ id })}
			<Area bind:value={v2} {id} placeholder="Type here" />
		{/snippet}
	</Field>
</div>
