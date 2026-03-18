<script>
	import { RangeCalendar } from "../../src/index";
</script>

<div class="demo-box">
	<h3>Range Calendar</h3>
	<div class="demo-hscroll">
		<RangeCalendar
			start={new Date(2022, 2, 18)}
			end={new Date(2022, 2, 22)}
		/>
	</div>
	<div class="demo-hscroll">
		<RangeCalendar
			start={new Date(2022, 1, 18)}
			end={new Date(2022, 2, 22)}
		/>
	</div>
</div>

<div class="demo-box">
	<h3>Range Calendar without buttons</h3>
	<div class="demo-hscroll">
		<RangeCalendar buttons={false} />
	</div>
</div>

<div class="demo-box">
	<h3>Range Calendar with Done button</h3>
	<div class="demo-hscroll">
		<RangeCalendar buttons={["done", "clear", "today"]} />
	</div>
</div>

<div class="demo-box" style="width: 160px">
	<h3>Single month</h3>
	<RangeCalendar months={1} />
</div>
