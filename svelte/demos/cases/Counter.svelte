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
		<Counter />
	</Field>

	<Field label="Initial value">
		<Counter bind:value={v1} />
		<div>The value is: {v1}</div>
	</Field>

	<Field label="Custom step">
		<Counter bind:value={v2} step={3} />
	</Field>

	<Field label="With negative numbers">
		<Counter min={-Infinity} />
	</Field>

	<Field label="With custom min and max values (-30, 30)">
		<Counter min={-30} max={30} bind:value={v3} />
	</Field>

	<Field label="Handling change event">
		<Counter onchange={handleChange} />
		<div>The value is: {v4}</div>
	</Field>

	<Field label="Disabled">
		<Counter disabled />
	</Field>

	<Field label="Readonly">
		<Counter readonly />
	</Field>

	<Field label="Error">
		<Counter error />
	</Field>
</div>
