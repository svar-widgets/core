<script>
	import { Month } from "../../src/index";
	import { getContext } from "svelte";

	const helpers = getContext("wx-helpers");

	const value = new Date(2025, 4, 1);
	const addMonth = (date, n) => {
		const next = new Date(date);
		next.setMonth(next.getMonth() + n);
		return next;
	};

	function onchange(date) {
		helpers.showNotice({
			text: "click on " + date.toString().substring(0, 15),
		});
	}
</script>

<div class="demo-box" style="width: 300px">
	<h3>Month view</h3>
	<div class="row">
		<div class="cell">
			<Month current={addMonth(value, 0)} {onchange} />
		</div>
		<div class="cell">
			<Month current={addMonth(value, 1)} {onchange} />
		</div>
		<div class="cell">
			<Month current={addMonth(value, 2)} {onchange} />
		</div>
	</div>
</div>

<div class="demo-box custom_size">
	<h3>Calendar with custom size</h3>
	<Month current={new Date(2022, 2, 18)} />
</div>

<style>
	.custom_size {
		--wx-calendar-cell-size: 64px;
	}
	.custom_size :global(.days .day) {
		padding: 3px;
		align-items: start;
		justify-content: left;
	}
	.custom_size :global(.weekdays .weekday) {
		padding: 3px;
		text-align: left;
	}

	.row {
		display: flex;
		flex-direction: row;
		--wx-color-font-disabled: transparent;
	}
	.cell {
		margin: 20px;
		min-width: 220px;
	}
</style>
