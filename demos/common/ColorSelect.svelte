<script>
	import { ColorSelect, Field } from "../../src/index";

	let color;

</script>

<div class="demo-box">
	<h4>The selected color: {color ? color : ''}</h4>
	<Field label="Select a color" let:id>
		<ColorSelect
			bind:value={color}
			{id}
			title="Colors can be reconfigured" />
	</Field>
</div>

<div class="demo-box">
	<h4>Custom colors</h4>
	<Field label="Your color" position="left" let:id>
		<ColorSelect
			{id}
			colors={['#65D3B3', '#FFC975', '#58C3FE']}
			placeholder="Select a color..." />
	</Field>
	<Field label="Disabled" position="left" let:id>
		<ColorSelect
			{id}
			colors={['#65D3B3', '#FFC975', '#58C3FE']}
			placeholder="Select a color..."
			disabled
			value="#65D3B3" />
	</Field>
	<Field label="Error" position="left" error let:id>
		<ColorSelect
			{id}
			colors={['#65D3B3', '#FFC975', '#58C3FE']}
			placeholder="Select a color..."
			error />
	</Field>
</div>
