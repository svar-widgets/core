<script>
	import { Tabs } from "../../src/index";
	import { getContext } from "svelte";

	const { showNotice } = getContext("wx-helpers");

	const tabs = [
		{ id: 0, label: "Info", icon: "wxi-alert" },
		{ id: 1, label: "About" },
		{ id: 2, label: "Contact" },
		{ id: 3, label: "", icon: "wxi-check" },
	];

	let active = 2;

	function changeHandler(ev) {
		active = ev.detail;
		showNotice({
			type: "info",
			expire: 2000,
			text: "ID: " + active,
		});
	}
</script>

<div class="demo-box">
	<h3>Tabs</h3>

	<div class="tabbar">
		<Tabs options={tabs} bind:value={active} />
		{#if active === 0}
			<div class="body">Info</div>
		{:else if active === 1}
			<div class="body">About</div>
		{:else if active === 2}
			<div class="body">Contact</div>
		{:else}
			<div class="body">Check</div>
		{/if}
		<Tabs options={tabs} bind:value={active} type="bottom" />
	</div>

	<h3>on:change</h3>
	<Tabs options={tabs} value={0} on:change={changeHandler} />
</div>

<style>
	.body {
		height: 200px;
		padding: 20px;
	}
	.tabbar {
		border-left: var(--wx-border);
		margin-left: 20px;
	}
</style>
