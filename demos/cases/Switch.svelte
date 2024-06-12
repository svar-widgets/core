<script>
	import { Switch, Field } from "../../src/index";

	let v1 = false;
	let v2 = false;
</script>

<div class="demo-box">
	<h3>Switch Button</h3>
	<Field>
		<Switch bind:checked={v1} />
	</Field>
</div>

<div class="demo-box">
	<h3>Switch Button with a side label</h3>
	<Field label="Switch: {v2}" position="left" type="switch" let:id>
		<Switch bind:checked={v2} {id} />
	</Field>
	<Field label="Disabled" position="left" type="switch" let:id>
		<Switch disabled {id} />
	</Field>
</div>
