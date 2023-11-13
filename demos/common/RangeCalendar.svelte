<script>
	import { RangeCalendar } from "../../src/index";

</script>

<div class="demo-box" style="width: 300px">
	<h4>Range Calendar</h4>
	<RangeCalendar start={new Date(2022, 2, 18)} end={new Date(2022, 2, 22)} />

	<RangeCalendar start={new Date(2022, 1, 18)} end={new Date(2022, 2, 22)} />
</div>

<div class="demo-box" style="width: 300px">
	<h4>Range Calendar without buttons</h4>
	<RangeCalendar buttons={false} />
</div>

<div class="demo-box" style="width: 160px">
	<h4>Single month</h4>
	<RangeCalendar months={1} />
</div>
