<script>
	import {
		Globals,
		Willow,
		WillowDark,
		Material,
		Locale,
		popupContainer,
	} from "wx-svelte-core";
	import CustomCoreWidgets from "./CustomCoreWidgets.svelte";

	let skin = "willow";
</script>

<Willow />
<WillowDark />
<Material />

<div class="wx-{skin}-theme content" use:popupContainer>
	<Locale>
		<Globals>
			<CustomCoreWidgets bind:skin />
		</Globals>
	</Locale>
</div>

<style>
	.content {
		height: 100%;
		width: 100%;
	}
</style>
