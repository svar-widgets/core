<script>
	import { Icon } from "../../src/index";
	import { icons } from "../data/icons";

	const arrs = [];
	// split icons in block of 10 icons each
	for (let i = 0; i < icons.length; i += 16) {
		arrs.push(icons.slice(i, i + 16));
	}
</script>

<div class="demo-box">
	<h3>Icons</h3>
	{#each arrs as subset}
		<div>
			{#each subset as icon}
				<Icon title={icon} css={icon} />
			{/each}
		</div>
	{/each}
</div>
