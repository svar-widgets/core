<script>
	import { TimePicker, Field, Locale } from "../../src/index";
	import { cn } from "@svar-ui/core-locales";

	let value = $state(null);
</script>

<div class="demo-box">
	<h3>TimePicker</h3>
	<Field label="Initial value" position="left">
		<TimePicker bind:value />
	</Field>
	<Field label="Default value" position="left">
		<TimePicker />
	</Field>
</div>

<div class="demo-box">
	<h3>TimePicker with a side label</h3>
	<Field label="Time" position="left">
		<TimePicker {value} />
	</Field>
	<Field label="Disabled" position="left">
		<TimePicker {value} disabled />
	</Field>
	<Field label="Error" position="left" error>
		<TimePicker {value} error title="Invalid option" />
	</Field>
</div>

<div class="demo-box">
	<h3>12-hour TimePicker</h3>
	<Locale
		words={{
			formats: { timeFormat: "%g:%i %a" },
			calendar: { clockFormat: 12 },
		}}
	>
		<TimePicker {value} />
	</Locale>
</div>

<div class="demo-box">
	<h3>CN locale</h3>
	<Locale words={cn}>
		<TimePicker {value} />
	</Locale>
</div>
