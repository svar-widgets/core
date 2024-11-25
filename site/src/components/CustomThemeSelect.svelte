<script>
	import { Switch } from "wx-svelte-core";

	let { value = $bindable() } = $props();

	const skins = [
		{
			id: "willow",
			css: "wx-willow-theme",
			name: "Willow",
			color: "#37a9ef",
			color2: "#fff",
		},
		{
			id: "willow-dark",
			css: "wx-willow-dark-theme",
			name: "Dark",
			color: "#7a67eb",
			color2: "#384047",
		},
	];

	const swithValue = () => {
		const ind = (skins.findIndex(a => a.id === value) + 1) % skins.length;
		value = skins[ind].id;
	};
</script>

<div class="custom" class:dark={swithValue} style="width: 170px">
	<Switch value={value === "willow"} onchange={swithValue} />
</div>

<style>
	.custom :global(span::before) {
		background-image: url(../assets/icons/Willow.svg);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 16px 16px;
	}
	.custom.dark :global(span::before) {
		background-image: url(../assets/icons/Willow_dark.svg);
	}
</style>
