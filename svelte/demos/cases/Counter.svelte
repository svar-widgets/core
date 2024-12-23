<script>
	import { Counter, Field } from "../../src/index";
	let v1 = $state(5),
		v2 = $state(3),
		v3 = $state(29),
		v4 = $state(0);

	function handleChange({ input, value }) {
		if (!input) v4 = value;
	}
</script>

<div class="demo-box">
	<Field label="No initial value">
		{#snippet children({ id })}
			<Counter {id} />
		{/snippet}
	</Field>

	<Field label="Initial value">
		{#snippet children({ id })}
			<Counter {id} bind:value={v1} />
			<div>The value is: {v1}</div>
		{/snippet}
	</Field>

	<Field label="Custom step">
		{#snippet children({ id })}
			<Counter {id} bind:value={v2} step={3} />
		{/snippet}
	</Field>

	<Field label="With negative numbers">
		{#snippet children({ id })}
			<Counter {id} min={-Infinity} />
		{/snippet}
	</Field>

	<Field label="With custom min and max values (-30, 30)">
		{#snippet children({ id })}
			<Counter {id} min={-30} max={30} bind:value={v3} />
		{/snippet}
	</Field>

	<Field label="Handling change event">
		{#snippet children({ id })}
			<Counter {id} onchange={handleChange} />
			<div>The value is: {v4}</div>
		{/snippet}
	</Field>

	<Field label="Disabled">
		{#snippet children({ id })}
			<Counter {id} disabled />
		{/snippet}
	</Field>

	<Field label="Readonly">
		{#snippet children({ id })}
			<Counter {id} readonly />
		{/snippet}
	</Field>

	<Field label="Error">
		{#snippet children({ id })}
			<Counter {id} error />
		{/snippet}
	</Field>
</div>
