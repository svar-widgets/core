<script>
	import { ColorBoard, ColorPicker, Field } from "../../src/index";

	let value = $state("#48C8E2");
	let selectedColor = $state("");
</script>

<div class="demo-box">
	<h3>The current color: {value || ""}</h3>
	<div style="width:300px; height: auto;">
		<ColorBoard bind:value />
	</div>
	<h3>The selected form color: {selectedColor || ""}</h3>
	<div style="width:300px; height: auto;">
		<ColorBoard bind:value={selectedColor} />
	</div>
</div>

<div class="demo-box">
	<h3>Custom color select forms:</h3>
	<Field label="Your color" position="left">
		<ColorPicker value="#5D59BA" placeholder="Select a color..." />
	</Field>
	<Field label="Disabled" position="left">
		<ColorPicker placeholder="Select a color..." disabled value="#65D3B3" />
	</Field>
	<Field label="Error" position="left" error>
		<ColorPicker placeholder="Select a color..." error />
	</Field>
	<Field label="Clear button" position="left">
		<ColorPicker value="#65D3B3" placeholder="Select a color..." clear />
	</Field>
</div>
