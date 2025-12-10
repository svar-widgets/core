<script>
	import { Switch, Field } from "../../src/index";

	let v1 = $state(true);
	let v2 = $state(false);
</script>

<div class="demo-box">
	<h3>Switch Button</h3>
	<Field>
		<Switch bind:value={v1} />
	</Field>
</div>

<div class="demo-box">
	<h3>Switch Button with a side label</h3>
	<Field label="Switch: {v2}" position="left" type="switch">
		<Switch bind:value={v2} />
	</Field>
	<Field label="Disabled" position="left" type="switch">
		<Switch disabled />
	</Field>
</div>
