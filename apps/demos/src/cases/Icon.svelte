<script lang="ts">
	import { Icon } from "@svar-ui/svelte-core";
	import { icons } from "../data/icons";

	const arrs: string[][] = [];
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
