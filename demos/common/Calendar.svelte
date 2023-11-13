<script>
	import { Calendar, Locale } from "../../src/index";
	import { de, cn } from "@wx/core-locales";

	const markLine = v =>
		v >= new Date(2022, 2, 13) && v <= new Date(2022, 2, 19)
			? "inrange"
			: "";

	const markLine2 = v =>
		v >= new Date(2022, 2, 8) && v <= new Date(2022, 2, 29)
			? "inrange"
			: "";

</script>

<div class="demo-box" style="width: 300px">
	<h4>Calendar</h4>
	<div style="display: flex; flex-direction: row;">
		<Calendar value={new Date(2022, 2, 18)} />
		<Calendar current={new Date(2022, 2, 18)} markers={markLine} />
		<Calendar current={new Date(2022, 2, 18)} markers={markLine2} />
	</div>
</div>

<div class="demo-box" style="width: 300px">
	<h4>Calendar with Locale</h4>
	<div style="display: flex; flex-direction: row;">
		<Locale words={de}>
			<Calendar value={new Date(2022, 2, 18)} />
		</Locale>
		<Locale words={cn}>
			<Calendar value={new Date(2022, 2, 18)} />
		</Locale>
	</div>
</div>

<div class="demo-box" style="width: 300px">
	<h4>Calendar without buttons</h4>
	<Calendar value={new Date(2022, 2, 18)} buttons={false} />
</div>
