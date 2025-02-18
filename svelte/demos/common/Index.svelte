<script>
	import {
		Material,
		Willow,
		WillowDark,
		Globals,
		Locale,
		popupContainer,
	} from "wx-svelte-core";

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

	let skin = $state(null);

	const skinSettings = $derived(
		Object.assign(
			skinSettings,
			(skins.find(a => a.id === skin) || {}).props
		)
	);

	function toggleSkin(e) {
		e.stopPropagation();
		const data = e.target.dataset;
		if (data.role === "skin") {
			skin = data.id;
		}
	}

	function hideSidebar(e) {
		e.stopPropagation();
		show = false;
	}

	let title = $state("");
	let show = $state(false);
	let noSidebar = document.location.search.indexOf("no-sidebar") !== -1;

	function onClick() {
		show = true;
	}

	function updateInfo(ev) {
		skin = ev.skin;
		title = ev.title;
	}

	const links = getLinks();

	$effect(() => {
		document.body.className = `wx-${skin}-theme`;
	});
</script>

<Material />
<Willow />
<WillowDark />

<div class="layout" class:no-sidebar={noSidebar}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div class="sidebar" class:move={show} role="tabpanel" onclick={onClick}>
		{#if show}
			<div class="title">WX Demos</div>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="icon" onclick={hideSidebar}>
				<i class="wxi-angle-left"></i>
			</div>
		{/if}

		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div
			role="toolbar"
			class="skins"
			class:move={!show}
			onclick={toggleSkin}
		>
			{#each skins as data (data.id)}
				<div
					class="skin"
					class:selected={data.id === skin}
					data-role="skin"
					data-id={data.id}
				>
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
			<div class="vertical icon"><i class="wxi-angle-right"></i></div>
		{/if}
	</div>

	<div
		use:popupContainer
		class="content wx-{skin}-theme"
		class:move={show}
		role="none"
		onclick={() => (show = false)}
	>
		<Locale>
			<Globals>
				<Router onnewpage={updateInfo} {skin} />
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
		transition:
			transform 0.3s,
			width 0.3s;
		transform: translateX(80px);
		overflow-y: auto;
		position: relative;
	}

	.content.move {
		transform: translateX(300px);
		width: calc(100% - 300px);
	}

	.hint {
		position: absolute;
		top: 60px;
		right: 30px;
		font-size: 16px;
		font-weight: 500;
		color: #5f5f5f;
		transform: rotate(180deg);
		writing-mode: vertical-rl;
	}
	.icon {
		width: 32px;
		height: 32px;
		cursor: pointer;
		border-radius: 16px;
		line-height: 32px;
		background-color: #fff;
		text-align: center;
		position: absolute;
		top: 12px;
		right: 10px;
		color: #5f5f5f;
	}
	.vertical.icon {
		background-color: rgba(235, 235, 235, 0.61);
		right: 22px;
	}
	.icon i {
		font-size: 24px;
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
		bottom: 92px;
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

	.content :global(h4) {
		font-size: 16px;
		font-weight: 300;
		margin-bottom: 12px;
		border-bottom: var(--wx-border);
	}

	.content :global(h3) {
		font-size: 18px;
		margin: 12px 0;
		font-weight: normal;
	}
	.content :global(.demo-box) {
		margin: 20px;
	}
	.content :global(.demo-box + .demo-box) {
		margin-top: 40px;
	}
	.content :global(.demo-code) {
		font-family: monospace;
		line-height: 30px;
	}

	.content :global(.demo-status) {
		height: 30px;
		line-height: 30px;
		background: rgba(0, 0, 0, 0.15);
		padding-left: 10px;
	}

	.content :global(.demo-toolbar) {
		border: 2px solid var(--wx-background-alt);
		max-width: 600px;
	}
</style>
