<script>
	import { Text, Field } from "../../src/index";

	let text2 = $state(""),
		password2 = $state("");
</script>

<div class="demo-box">
	<h3>Text with a top label</h3>
	<Field label="First name">
		<Text bind:value={text2} placeholder="Type here" />
	</Field>
	<Field label="Last name">
		<Text bind:value={text2} placeholder="Type here" />
	</Field>
	<Field label="Last name">
		<Text bind:value={text2} disabled placeholder="Type here" />
	</Field>
	<Field label="Last name" error>
		<Text
			bind:value={text2}
			error
			placeholder="Type here"
			title="Invalid value"
		/>
	</Field>
</div>

<div class="demo-box">
	<h3>Text with a side label</h3>
	<Field label="First name" position="left">
		<Text bind:value={text2} />
	</Field>
	<Field label="Last name" position="left">
		<Text bind:value={text2} />
	</Field>
</div>

<div class="demo-box">
	<h3>Number input with a side label</h3>
	<Field label="Number" position="left">
		<Text type="number" />
	</Field>
</div>

<div class="demo-box">
	<h3>Password input with a side label</h3>
	<Field label="Password" position="left">
		<Text type="password" bind:value={password2} />
	</Field>
</div>

<div class="demo-box">
	<h3>Icon inside of the text control</h3>
	<Field label="Start Date" position="top">
		<Text icon="wxi-calendar" css="wx-icon-left" />
	</Field>
	<Field label="End Date" position="top">
		<Text icon="wxi-calendar" />
	</Field>
</div>

<div class="demo-box">
	<h3>Text control with clear button</h3>
	<Field label="First name" position="top">
		<Text placeholder="Type here" clear />
	</Field>
	<Field label="Number" position="top">
		<Text type="number" clear />
	</Field>
	<Field label="Number and icon" position="top">
		<Text type="number" clear icon="wxi-calendar" />
	</Field>
	<Field label="Number and icon left" position="top">
		<Text type="number" clear icon="wxi-calendar" css="wx-icon-left" />
	</Field>
	<Field label="End Date" position="top">
		<Text icon="wxi-calendar" clear />
	</Field>
	<Field label="Start Date" position="top">
		<Text icon="wxi-calendar" css="wx-icon-left" clear />
	</Field>
</div>
