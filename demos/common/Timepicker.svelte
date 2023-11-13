<script>
	import { Timepicker, Field, Locale } from "../../src/index";
	import { cn } from "@wx/core-locales";

	let value = null;

</script>

<div class="demo-box">
	<h4>TimePicker</h4>
	<Field label="Initial value" position="left">
		<Timepicker bind:value />
	</Field>
	<Field label="Default value" position="left">
		<Timepicker />
	</Field>
</div>

<div class="demo-box">
	<h4>TimePicker with a side label</h4>
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
	<h4>12-hour TimePicker</h4>
	<Locale words={{ calendar: { timeFormat: 12 } }}>
		<Timepicker {value} />
	</Locale>
</div>

<div class="demo-box">
	<h4>CN locale</h4>
	<Locale words={cn}>
		<Timepicker {value} />
	</Locale>
</div>
