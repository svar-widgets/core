<script>
	import { Field, DatePicker } from "../../src/index";
</script>

<div class="demo-box">
	<h3>DatePicker in a scrollable container.</h3>
	<p>
		Click to show and scroll the container. <b>trackScroll</b> closes dropdown
		on scroll
	</p>
	<p>
		<Field>
			<div class="container" style="height: 150px;overflow: auto;">
				<div style="width:100%;height:700px;">
					<DatePicker dropdown={{ trackScroll: true }} />
				</div>
			</div>
		</Field>
	</p>
	<p>
		<b>inline</b> dropdown mode
	</p>
	<p>
		<Field>
			<div class="container" style="height: 150px;overflow: auto;">
				<div style="width:100%;height:700px;">
					<DatePicker dropdown={{ inline: true }} />
				</div>
			</div>
		</Field>
	</p>
</div>

<style>
	.container {
		width: 100%;
		height: 100px;
		position: relative;
		overflow: hidden;
		border: 1px solid #ddd;
		padding: 20px;
	}
</style>
