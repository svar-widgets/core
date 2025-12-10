<script>
	import { DateRangePicker, Field } from "../../src/index";

	const date = {
		start: new Date(2020, 1, 1),
		end: new Date(2021, 3, 3),
	};

	import { getContext } from "svelte";
	const wh = getContext("wx-helpers");
	function showChanges(ev) {
		wh.showNotice({
			text: `Date changed to ${JSON.stringify(ev.value)}`,
		});
	}

	function parseDate(string) {
		const p = string.match(/(..)(..)(.+)/);
		return p ? new Date(p.slice(1, 4).join("/")) : null;
	}
</script>

<div class="demo-box">
	<h3>DateRangePicker</h3>
	<Field label="Date range">
		<DateRangePicker value={date} onchange={showChanges} />
	</Field>
	<Field label="DateRangePicker with the Done button">
		<DateRangePicker value={date} buttons={["done", "clear", "today"]} />
	</Field>
	<Field label="Disabled">
		<DateRangePicker disabled value={date} />
	</Field>
	<Field label="Editable (new Date())">
		<DateRangePicker editable value={date} />
	</Field>
	<Field label="Editable, custom format (MMDDYYYY - MMDDYYYY)">
		<DateRangePicker editable={parseDate} value={date} format={"%m%d%Y"} />
	</Field>
	<Field label="Error" error>
		<DateRangePicker error value={date} title="Invalid date" />
	</Field>

	<Field label="Custom format">
		<DateRangePicker format="%d %F, %Y" value={date} />
	</Field>
	<Field label="Custom icon position">
		<DateRangePicker value={date} css="wx-icon-left" />
	</Field>
	<Field label="Single month">
		<DateRangePicker months={1} />
	</Field>
	<Field label="Clear button">
		<DateRangePicker value={date} clear />
	</Field>
</div>
