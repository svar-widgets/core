<script>
	import {
		Material,
		Willow,
		WillowDark,
		Globals,
		Locale,
		popupContainer,
	} from "../src/index";

	import Router from "./Router.svelte";
	import Link from "./Link.svelte";
	import { getLinks } from "./helpers";

	const skins = [
		{
			id: "material",
			name: "Material",
			props: {},
		},
		{
			id: "willow",
			name: "Willow",
			props: {},
		},
		{
			id: "willow-dark",
			name: "Dark",
			props: {},
		},
	];

	let skin = null;

	let skinSettings = {};
	$: Object.assign(
		skinSettings,
		(skins.find(a => a.id === skin) || {}).props
	);

	function toggleSkin(e) {
		const data = e.target.dataset;
		if (data.role === "skin") {
			skin = data.id;
		}
	}

	let title = "";
	let show = false;
	let noSidebar = document.location.search.indexOf("no-sidebar") !== -1;

	function onClick() {
		show = true;
	}

	function updateInfo(ev) {
		skin = ev.detail.skin;
		title = ev.detail.title;
	}

	const links = getLinks();
	$: document.body.className = `wx-${skin}-theme`;

</script>

<Material />
<Willow />
<WillowDark />

<div class="layout" class:no-sidebar={noSidebar}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="sidebar" class:move={show} on:click={onClick}>
		{#if show}
			<div class="title">WX Demos</div>
		{/if}

		<div
			class="skins"
			class:move={!show}
			on:click|stopPropagation={toggleSkin}>
			{#each skins as data (data.id)}
				<div
					class="skin"
					class:selected={data.id === skin}
					data-role="skin"
					data-id={data.id}>
					{data.name}
				</div>
			{/each}
		</div>

		{#if show}
			{#each links as data (data[0])}
				<Link {data} {skin} />
			{/each}
		{:else}
			<div class="hint">{title}</div>
		{/if}
	</div>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		use:popupContainer
		class="content wx-{skin}-theme"
		class:move={show}
		on:click={() => (show = false)}>
		<Locale>
			<Globals>
				<Router on:newpage={updateInfo} {skin} />
			</Globals>
		</Locale>
	</div>
</div>

<style>
	.layout {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.sidebar {
		font-family: Roboto, Arial, Helvetica, sans-serif;
		font-size: 16px;
		line-height: 20px;
		box-sizing: border-box;
		position: absolute;
		height: 100%;
		width: 300px;
		background-color: #fbfbfb;
		transform: translateX(-220px);
		transition: 0.3s;
		z-index: 1;
		border-right: 1px solid #ebebeb;
		overflow-y: auto;
	}

	.sidebar.move {
		transform: translateX(0);
	}

	.content {
		height: 100%;
		width: calc(100% - 80px);
		transition: transform 0.3s, width 0.3s;
		transform: translateX(80px);
		padding: 40px;
		overflow-y: auto;
		position: relative;
	}

	.content.move {
		transform: translateX(300px);
		width: calc(100% - 300px);
	}

	.hint {
		position: absolute;
		top: 30px;
		right: 30px;
		font-size: 16px;
		font-weight: 500;
		color: #5f5f5f;
		transform: rotate(180deg);
		writing-mode: vertical-rl;
	}

	.title {
		height: 58px;
		line-height: 58px;
		margin-bottom: 30px;
		text-align: center;
		font-size: 16px;
		font-weight: 500;
		color: #5f5f5f;
		background-color: rgba(235, 235, 235, 0.61);
	}

	.skins {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 250px;
		height: 30px;
		margin: 0 auto;
		margin-bottom: 30px;
		border-radius: 15px;
		text-align: center;
		background-color: #e6e6e6;
	}

	.skins.move {
		position: absolute;
		top: 330px;
		right: -86px;
		transform: rotate(-90deg);
	}

	.skin {
		box-sizing: border-box;
		width: 123px;
		height: 26px;
		line-height: 26px;
		border-radius: 13px;
		font-weight: 400;
		text-transform: capitalize;
		color: #1876d2;
		cursor: pointer;
	}

	.skin.selected {
		font-weight: 500;
		color: #fff;
		background-color: #2095f3;
	}

	.demo {
		height: 36px;
		line-height: 36px;
		padding-left: 24px;
		border-left: 5px solid transparent;
		color: #5f5f5f;
		list-style: none;
		cursor: pointer;
		text-decoration: none;
		display: block;
	}

	.demo.active,
	.demo:hover {
		border-left-color: #2095f3;
		background-color: #ebebeb9c;
		font-weight: 500;
		cursor: pointer;
	}

	.no-sidebar .sidebar {
		display: none;
	}
	.no-sidebar .content {
		width: 100%;
		transform: none;
	}

	:global(.demo-box) {
		max-width: 870px;
	}
	:global(.demo-box + .demo-box) {
		margin-top: 50px;
	}

	:global(.demo-box h4) {
		font-size: 16px;
		font-weight: 300;
		margin-bottom: 12px;
		border-bottom: var(--wx-border);
	}

	:global(h3) {
		font-size: 18px;
		margin: 12px 0;
	}

	/* Willow */
	:global(.wx-willow-theme .demo-box h4) {
		/*color: #444;*/
		/*font-weight: 300;*/
	}
	:global(.wx-willow-theme h3) {
		/*font-weight: 700;*/
	}
	/* Willow Dark */
	:global(.wx-willow-dark-theme .demo-box h4) {
		/*color: white;*/
	}

</style>
