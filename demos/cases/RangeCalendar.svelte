<script>
	import { RangeCalendar } from "../../src/index";
</script>

<div class="demo-box" style="width: 300px">
	<h3>Range Calendar</h3>
	<RangeCalendar start={new Date(2022, 2, 18)} end={new Date(2022, 2, 22)} />

	<RangeCalendar start={new Date(2022, 1, 18)} end={new Date(2022, 2, 22)} />
</div>

<div class="demo-box" style="width: 300px">
	<h3>Range Calendar without buttons</h3>
	<RangeCalendar buttons={false} />
</div>

<div class="demo-box" style="width: 160px">
	<h3>Single month</h3>
	<RangeCalendar months={1} />
</div>
