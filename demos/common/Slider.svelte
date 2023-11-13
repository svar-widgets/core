<script>
	import { Field, Slider } from "../../src/index";

	let value = 50;

</script>

<div class="demo-box">
	<h4>Slider</h4>
	<Field>
		<Slider label="Progress: {value}%" bind:value />
	</Field>
	<Field label="Disabled" position="left" type="slider" let:id>
		<Slider disabled {id} value={20} />
	</Field>
	<Field label="Unset value" position="left" type="slider" let:id>
		<Slider {id} title="Default slider's value is 0" />
	</Field>
</div>
