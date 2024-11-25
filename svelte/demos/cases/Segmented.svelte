<script>
	import { Segmented } from "../../src/index";

	const options = [
		{ id: 1, name: "One", icon: "wxi-view-sequential", title: "Grid mode" },
		{ id: 2, name: "Two", icon: "wxi-view-grid", title: "Tiles mode" },
		{
			id: 3,
			name: "Three",
			icon: "wxi-view-column",
			title: "Two panels mode",
		},
	];

	const optionsIcons = options.map(a => ({ ...a, name: null }));
	const optionsText = options.map(a => ({ ...a, icon: null }));

	let value = $state(2);
</script>

<div class="demo-box">
	<h3>Default templates</h3>

	<h4>Segmented Button</h4>
	<Segmented options={optionsText} bind:value />

	<h4>Segmented Button with icons</h4>
	<Segmented options={optionsIcons} bind:value />

	<h4>Segmented Button with a mixed content</h4>
	<Segmented {options} value={1} />
</div>

<div class="demo-box">
	<h3>Custom templates</h3>

	<h4>Segmented Button</h4>
	<Segmented {options} {value}
		>{#snippet children({ option })}
			{option.name}
		{/snippet}
	</Segmented>

	<h4>Segmented Button with icons</h4>
	<Segmented {options} value={1}>
		{#snippet children({ option })}
			<i class="icon {option.icon}"></i>
		{/snippet}
	</Segmented>

	<h4>Segmented Button with a mixed content</h4>
	<Segmented {options} value={2}>
		{#snippet children({ option })}
			<i class="icon {option.icon}"></i>
			<span class="bottom">{option.name}</span>
		{/snippet}
	</Segmented>
</div>

<style>
	.icon {
		height: 48px;
		font-size: 48px;
		line-height: 1;
		color: inherit;
	}
	.bottom {
		display: block;
		text-align: center;
		margin-left: 10px;
	}
</style>
