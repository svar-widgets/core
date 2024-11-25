<script>
	import { ColorSelect, Field } from "../../src/index";

	let color = $state("");
</script>

<div class="demo-box">
	<h3>The selected color: {color ? color : ""}</h3>
	<Field label="Select a color">
		{#snippet children({ id })}
			<ColorSelect
				bind:value={color}
				{id}
				title="Colors can be reconfigured"
			/>
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>Custom colors</h3>
	<Field label="Your color" position="left">
		{#snippet children({ id })}
			<ColorSelect
				{id}
				colors={["#65D3B3", "#FFC975", "#58C3FE"]}
				placeholder="Select a color..."
			/>
		{/snippet}
	</Field>
	<Field label="Disabled" position="left">
		{#snippet children({ id })}
			<ColorSelect
				{id}
				colors={["#65D3B3", "#FFC975", "#58C3FE"]}
				placeholder="Select a color..."
				disabled
				value="#65D3B3"
			/>
		{/snippet}
	</Field>
	<Field label="Error" position="left" error>
		{#snippet children({ id })}
			<ColorSelect
				{id}
				colors={["#65D3B3", "#FFC975", "#58C3FE"]}
				placeholder="Select a color..."
				error
			/>
		{/snippet}
	</Field>
</div>
