<script>
	import { Button, Segmented, Calendar } from "../../src/index";
	import { getContext } from "svelte";

	const { showNotice } = getContext("wx-helpers");

	function onclick() {
		showNotice({
			text: "Button clicked",
		});
	}
</script>

<div class="demo-box">
	<h3>Buttons</h3>
	<Button {onclick} type="primary">Primary</Button>
	<Button {onclick} type="secondary">Secondary</Button>
	<Button {onclick} type="danger">Danger</Button>
</div>

<div class="demo-box">
	<h3>Segmented</h3>
	<Segmented
		value="2"
		options={[
			{ id: "1", label: "One" },
			{ id: "2", label: "Two" },
			{ id: "3", label: "Three" },
		]}
	></Segmented>
</div>

<div class="demo-box">
	<h3>Calendar</h3>
	<div style="width: 280px;">
		<Calendar value={new Date(2025, 4, 1)} />
	</div>
</div>
