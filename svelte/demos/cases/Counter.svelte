<script>
	import { Counter, Field } from "../../src/index";
	let v1 = 5,
		v2 = 3,
		v3 = 29,
		v4 = 0;

	function handleChange({ detail }) {
		if (!detail.input) v4 = detail.value;
	}
</script>

<div class="demo-box">
	<Field label="No initial value" let:id>
		<Counter {id} />
	</Field>

	<Field label="Initial value" let:id>
		<Counter {id} bind:value={v1} />
		<div>The value is: {v1}</div>
	</Field>

	<Field label="Custom step" let:id>
		<Counter {id} bind:value={v2} step={3} />
	</Field>

	<Field label="With negative numbers" let:id>
		<Counter {id} min={-Infinity} />
	</Field>

	<Field label="With custom min and max values (-30, 30)" let:id>
		<Counter {id} min={-30} max={30} bind:value={v3} />
	</Field>

	<Field label="Handling change event" let:id>
		<Counter {id} on:change={handleChange} />
		<div>The value is: {v4}</div>
	</Field>

	<Field label="Disabled" let:id>
		<Counter {id} disabled />
	</Field>

	<Field label="Readonly" let:id>
		<Counter {id} readonly />
	</Field>

	<Field label="Error" let:id>
		<Counter {id} error />
	</Field>
</div>
