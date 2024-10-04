<script>
	import { ColorBoard, ColorPicker, Field } from "../../src/index";

	let value;
	let selectedColor;
</script>

<div class="demo-box">
	<h3>The current color: {value || ""}</h3>
	<div style="width:300px; height: auto;">
		<ColorBoard bind:value />
	</div>
	<h3>The selected form color: {selectedColor || ""}</h3>
	<div style="width:300px; height: auto;">
		<ColorBoard
			bind:value={selectedColor}
			placeholder="Select a color..."
		/>
	</div>
</div>

<div class="demo-box">
	<h3>Custom color select forms:</h3>
	<Field label="Your color" position="left" let:id>
		<ColorPicker value="#5D59BA" {id} placeholder="Select a color..." />
	</Field>
	<Field label="Disabled" position="left" let:id>
		<ColorPicker
			{id}
			placeholder="Select a color..."
			disabled
			value="#65D3B3"
		/>
	</Field>
	<Field label="Error" position="left" error let:id>
		<ColorPicker {id} placeholder="Select a color..." error />
	</Field>
</div>
