<script>
	import { DatePicker, Field } from "../../src/index";

	import { getContext } from "svelte";
	const wh = getContext("wx-helpers");
	function showChanges(ev) {
		wh.showNotice({ text: `Date changed to ${ev.detail.selected}` });
	}

	function parseDate(string) {
		const p = string.match(/(..)(..)(.+)/);
		return p ? new Date(p.slice(1, 4).join("/")) : null;
	}
</script>

<div class="demo-box">
	<h3>Datepicker</h3>
	<Field label="Wide" let:id>
		<DatePicker width="100%" {id} on:select={showChanges} />
	</Field>
	<Field label="Align auto" let:id>
		<DatePicker {id} />
	</Field>
	<Field label="Disabled" let:id>
		<DatePicker disabled {id} />
	</Field>
	<Field label="Editable (new Date())" let:id>
		<DatePicker editable {id} />
	</Field>
	<Field label="Editable custom format (MMDDYYYY)" let:id>
		<DatePicker editable={parseDate} {id} format={"%m%d%Y"} />
	</Field>
	<Field label="Align center" error let:id>
		<DatePicker error {id} align="center" title="Invalid date" />
	</Field>
	<Field label="Without buttons" let:id>
		<DatePicker {id} buttons={false} value={new Date(2022, 4, 10, 16, 0)} />
	</Field>
	<Field label="Default format" let:id>
		<DatePicker {id} value={new Date()} />
	</Field>
	<Field label="Custom format" let:id>
		<DatePicker {id} value={new Date()} format="%d %F, %Y" />
	</Field>
	<Field label="Custom icon position" let:id>
		<DatePicker {id} value={new Date()} css="wx-icon-left" />
	</Field>
</div>
