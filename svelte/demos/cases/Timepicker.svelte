<script>
	import { Timepicker, Field, Locale } from "../../src/index";
	import { cn } from "wx-core-locales";

	let value = null;
</script>

<div class="demo-box">
	<h3>TimePicker</h3>
	<Field label="Initial value" position="left">
		<Timepicker bind:value />
	</Field>
	<Field label="Default value" position="left">
		<Timepicker />
	</Field>
</div>

<div class="demo-box">
	<h3>TimePicker with a side label</h3>
	<Field label="Time" position="left" let:id>
		<Timepicker {value} {id} />
	</Field>
	<Field label="Disabled" position="left" let:id>
		<Timepicker {value} disabled {id} />
	</Field>
	<Field label="Error" position="left" error let:id>
		<Timepicker {value} error {id} title="Invalid option" />
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
		<Timepicker {value} />
	</Locale>
</div>

<div class="demo-box">
	<h3>CN locale</h3>
	<Locale words={cn}>
		<Timepicker {value} />
	</Locale>
</div>
