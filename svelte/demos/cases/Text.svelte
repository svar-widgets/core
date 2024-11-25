<script>
	import { Text, Field } from "../../src/index";

	let text2 = $state(""),
		password2 = $state("");
</script>

<div class="demo-box">
	<h3>Text with a top label</h3>
	<Field label="First name">
		{#snippet children({ id })}
			<Text bind:value={text2} {id} placeholder="Type here 2" />
		{/snippet}
	</Field>
	<Field label="Last name">
		{#snippet children({ id })}
			<Text bind:value={text2} {id} placeholder="Type here" />
		{/snippet}
	</Field>
	<Field label="Last name">
		{#snippet children({ id })}
			<Text bind:value={text2} {id} disabled placeholder="Type here" />
		{/snippet}
	</Field>
	<Field label="Last name" error>
		{#snippet children({ id })}
			<Text
				bind:value={text2}
				{id}
				error
				placeholder="Type here"
				title="Invalid value"
			/>
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>Text with a side label</h3>
	<Field label="First name" position="left">
		{#snippet children({ id })}
			<Text bind:value={text2} {id} />
		{/snippet}
	</Field>
	<Field label="Last name" position="left">
		{#snippet children({ id })}
			<Text bind:value={text2} {id} />
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>Number input with a side label</h3>
	<Field label="Number" position="left">
		{#snippet children({ id })}
			<Text type="number" bind:value={password2} {id} />
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>Password input with a side label</h3>
	<Field label="Password" position="left">
		{#snippet children({ id })}
			<Text type="password" bind:value={password2} {id} />
		{/snippet}
	</Field>
</div>

<div class="demo-box">
	<h3>Icon inside of the text control</h3>
	<Field label="Start Date" position="top">
		{#snippet children({ id })}
			<Text {id} icon="wxi-calendar" css="wx-icon-left" />
		{/snippet}
	</Field>
	<Field label="End Date" position="top">
		{#snippet children({ id })}
			<Text {id} icon="wxi-calendar" />
		{/snippet}
	</Field>
</div>
