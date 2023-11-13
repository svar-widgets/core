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
			text: `Date changed to ${JSON.stringify(ev.detail.selected)}`,
		});
	}

</script>

<div class="demo-box">
	<h4>DateRangePicker</h4>
	<Field label="Date range" let:id>
		<DateRangePicker value={date} {id} on:select={showChanges} />
	</Field>
	<Field label="DateRangePicker with the Done button" let:id>
		<DateRangePicker value={date} {id} done={true} />
	</Field>
	<Field label="Disabled" let:id>
		<DateRangePicker disabled value={date} {id} />
	</Field>
	<Field label="Error" error let:id>
		<DateRangePicker error value={date} {id} title="Invalid date" />
	</Field>

	<Field label="Custom format" let:id>
		<DateRangePicker format="%d %F, %Y" value={date} {id} />
	</Field>
	<Field label="Custom icon position" let:id>
		<DateRangePicker {id} value={date} css="wx-icon-left" />
	</Field>
	<Field label="Single month" let:id>
		<DateRangePicker {id} months={1} />
	</Field>
</div>
