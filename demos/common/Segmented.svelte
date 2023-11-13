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

	let value = 2;

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
	<Segmented {options} {value} let:option>{option.name}</Segmented>

	<h4>Segmented Button with icons</h4>
	<Segmented {options} let:option value={1}>
		<i class="icon {option.icon}" />
	</Segmented>

	<h4>Segmented Button with a mixed content</h4>
	<Segmented {options} value={2} let:option>
		<i class="icon {option.icon}" />
		<span class="bottom">{option.name}</span>
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
