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
	<Button {onclick}>Secondary</Button>
	<Button {onclick}>Danger</Button>
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
		<Calendar />
	</div>
</div>
