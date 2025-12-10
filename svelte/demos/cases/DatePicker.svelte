<script>
	import { DatePicker, Field } from "../../src/index";

	import { getContext } from "svelte";
	const date = new Date(2025, 4, 1);
	const wh = getContext("wx-helpers");
	function showChanges(ev) {
		wh.showNotice({ text: `Date changed to ${ev.value}` });
	}

	function parseDate(string) {
		const p = string.match(/(..)(..)(.+)/);
		return p ? new Date(p.slice(1, 4).join("/")) : null;
	}
</script>

<div class="demo-box">
	<h3>Datepicker</h3>
	<Field label="Wide">
		<DatePicker width="100%" onchange={showChanges} />
	</Field>
	<Field label="Align auto">
		<DatePicker />
	</Field>
	<Field label="Disabled">
		<DatePicker disabled />
	</Field>
	<Field label="Editable (new Date())">
		<DatePicker editable />
	</Field>
	<Field label="Editable custom format (MMDDYYYY)">
		<DatePicker editable={parseDate} format={"%m%d%Y"} />
	</Field>
	<Field label="Align center" error>
		<DatePicker error align="center" title="Invalid date" />
	</Field>
	<Field label="Without buttons">
		<DatePicker buttons={false} value={new Date(2022, 4, 10, 16, 0)} />
	</Field>
	<Field label="With Today button only">
		<DatePicker buttons={["today"]} value={new Date(2022, 4, 10, 16, 0)} />
	</Field>
	<Field label="Default format">
		<DatePicker value={date} />
	</Field>
	<Field label="Custom format">
		<DatePicker value={date} format="%d %F, %Y" />
	</Field>
	<Field label="Custom icon position">
		<DatePicker value={date} css="wx-icon-left" />
	</Field>
	<Field label="With clear icon">
		<DatePicker value={date} clear />
	</Field>
	<Field label="Custom clear icon position">
		<DatePicker value={date} css="wx-icon-left" clear />
	</Field>
</div>
