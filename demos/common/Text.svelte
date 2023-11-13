<script>
	import { Text, Field } from "../../src/index";

	let text2, password2;

</script>

<div class="demo-box">
	<h4>Text with a top label</h4>
	<Field label="First name" let:id>
		<Text bind:value={text2} {id} placeholder="Type here" />
	</Field>
	<Field label="Last name" let:id>
		<Text bind:value={text2} {id} placeholder="Type here" />
	</Field>
	<Field label="Last name" let:id>
		<Text bind:value={text2} {id} disabled placeholder="Type here" />
	</Field>
	<Field label="Last name" error let:id>
		<Text
			bind:value={text2}
			{id}
			error
			placeholder="Type here"
			title="Invalid value" />
	</Field>
</div>

<div class="demo-box">
	<h4>Text with a side label</h4>
	<Field label="First name" position="left" let:id>
		<Text bind:value={text2} {id} />
	</Field>
	<Field label="Last name" position="left" let:id>
		<Text bind:value={text2} {id} />
	</Field>
</div>

<div class="demo-box">
	<h4>Number input with a side label</h4>
	<Field label="Number" position="left" let:id>
		<Text type="number" bind:value={password2} {id} />
	</Field>
</div>

<div class="demo-box">
	<h4>Password input with a side label</h4>
	<Field label="Password" position="left" let:id>
		<Text type="password" bind:value={password2} {id} />
	</Field>
</div>

<div class="demo-box">
	<h4>Icon inside of the text control</h4>
	<Field label="Start Date" position="top" let:id>
		<Text {id} icon="wxi-calendar" css="wx-icon-left" />
	</Field>
	<Field label="End Date" position="top" let:id>
		<Text {id} icon="wxi-calendar" />
	</Field>
</div>
