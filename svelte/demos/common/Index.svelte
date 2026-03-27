<script>
	import {
		Globals,
		popupContainer,
		Button,
		Segmented,
	} from "@svar-ui/svelte-core";

	import Router from "./Router.svelte";
	import Link from "./Link.svelte";
	import { getLinks } from "./helpers";
	import { GitHubLogoIcon, LogoIcon } from "../assets/icons/index";

	const { publicName, skins, productTag, productLink } = $props();
	let skin = $state(skins[0].id);
	let title = $state("");
	let link = $state("");
	let show = $state(true);
	let innerWidth = $state(0);

	const links = getLinks();

	const MOBILE_BREAKPOINT = 767;

	const isMobileView = $derived(innerWidth <= MOBILE_BREAKPOINT);

	const skinSettings = $derived(
		Object.assign(
			skinSettings,
			(skins.find(a => a.id === skin) || {}).props
		)
	);

	function changeSkin({ value }) {
		skin = value;
	}

	function toggleSidebar() {
		show = !show;
	}

	function updateInfo(ev) {
		skin = ev.skin;
		title = ev.title;
		link = ev.link;
	}

	$effect(() => {
		if (isMobileView && title) {
			show = false;
		}
	});

	$effect(() => {
		document.body.className = `wx-willow-theme`;
	});
</script>

<svelte:window bind:innerWidth />

{#each skins as obj}
	<obj.component />
{/each}

<div class="layout" class:active={show} class:narrow={isMobileView}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div class="sidebar" class:active={show} role="tabpanel">
		<div class="sidebar-content">
			<div class="sidebar-header">
				<div class="box-title">
					<a
						href="https://svar.dev/svelte/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={LogoIcon}
							alt="Logo icon"
							class="box-title-img"
						/></a
					>
					<div class="separator"></div>
					<a
						href={`https://svar.dev/svelte/${productLink}/`}
						target="_blank"
						rel="noopener noreferrer"
						><h1 class="title">Svelte {publicName}</h1></a
					>
				</div>
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="btn-box">
					<Button
						type="secondary"
						icon="wxi-angle-left"
						css="toggle-btn"
						onclick={toggleSidebar}
					/>
				</div>
			</div>
			<div class="box-links">
				{#each links as data (data[0])}
					<Link
						{data}
						{skin}
						onclick={() => isMobileView && (show = false)}
					/>
				{/each}
			</div>
		</div>
	</div>
	<div class="page-content">
		<div class="page-header">
			{#if isMobileView}
				<div class="header-back-btn">
					<div class="btn-box">
						<Button
							icon="wxi-angle-left"
							css="toggle-btn"
							onclick={toggleSidebar}
							type="secondary"
						>
							Back to list
						</Button>
					</div>
				</div>
			{/if}
			<div class="page-content-header">
				<div class="header-title-box">
					{#if !show && !isMobileView}
						<div class="btn-box">
							<Button
								type="secondary"
								icon="wxi-angle-right"
								css="toggle-btn"
								onclick={toggleSidebar}
							/>
						</div>
					{/if}
					<div class="hint">{title}</div>
				</div>
				<div class="header-actions-container">
					<div class="segmented-box">
						<Segmented
							value={skin}
							options={skins}
							css="segmented-themes"
							onchange={changeSkin}
						>
							{#snippet children({ option })}
								{@const Icon = option.icon}
								<Icon />
								{#if !isMobileView}
									<span style="margin-left:4px;"
										>{option.label}</span
									>
								{/if}
							{/snippet}
						</Segmented>
					</div>
					<div class="btn-box">
						<a
							href={link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button type="secondary" css="toggle-btn link-btn">
								<div>
									<img
										src={GitHubLogoIcon}
										alt="GitHub icon"
									/>
								</div>
								{#if !isMobileView}
									<span>See code on GitHub</span>
								{/if}
							</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="wrapper-content" onclick={() => (show = false)} role="none">
			<div use:popupContainer class="content wx-{skin}-theme" role="none">
				<Globals>
					<Router onnewpage={updateInfo} {skin} {productTag} />
				</Globals>
			</div>
		</div>
	</div>
</div>

<style>
	* {
		-webkit-tap-highlight-color: transparent;
	}

	.page-header :global(*),
	.sidebar :global(*) {
		font-family: Roboto, Arial, Helvetica, sans-serif;
	}

	.page-header {
		--wx-border: 1px solid #ebebeb;
	}
	.layout {
		--demo-framework-color: #fc6519;
		box-sizing: border-box;
		display: flex;
		height: 100%;
		width: 100%;
	}

	.page-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}
	.header-back-btn {
		height: 48px;
		width: 100%;
		padding: 8px 16px;
		border-bottom: var(--wx-border);
	}

	.header-back-btn .btn-box :global(button.toggle-btn) {
		border: 1px solid transparent;
		padding: 5px;
		gap: 0;
		font-size: 16px;
		font-weight: 400;
		color: var(--demo-framework-color);
		&:hover,
		&:focus,
		&:active {
			border: 1px solid transparent;
			background: transparent;
		}
		:global(i) {
			color: var(--demo-framework-color);
		}
	}

	.page-content-header {
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 40px;
		padding: 12px;
		border-bottom: var(--wx-border);
	}

	.narrow .page-content-header {
		height: 68px;
		padding: 12px 16px 12px 28px;
	}

	.header-title-box {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-grow: 1;
		min-width: 0;
	}

	.header-actions-container {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.narrow .header-actions-container {
		gap: 12px;
	}

	.layout.active {
		flex-direction: row;
	}

	.sidebar {
		width: 0;
		height: 100%;
		overflow: hidden;
		transition: width 0.3s;
	}

	.narrow .sidebar {
		transition: none;
	}

	.sidebar-header {
		height: 60px;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0px;
		padding: 14px 16px 14px 18px;
		background-color: #fbfbfb;
	}

	.box-title {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.box-title-img {
		&:hover,
		&:focus {
			opacity: 0.6;
		}

		&:active {
			opacity: 0.8;
		}
	}

	.separator {
		width: 1px;
		height: 20px;
		background: #ebebeb;
	}

	.sidebar.active,
	.sidebar-content {
		width: 300px;
	}

	.narrow .sidebar.active,
	.narrow .sidebar-content {
		width: 100%;
	}

	.sidebar-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
		height: 100%;
		border-right: var(--wx-border);
		overflow-y: auto;
		font-size: 16px;
		line-height: 20px;
		background-color: #fbfbfb;
		border-bottom: var(--wx-border);
	}

	.btn-box :global(button.toggle-btn) {
		display: flex;
		align-items: center;
		gap: 8px;
		border: var(--wx-border);
		color: #2c2f3c;
		font-weight: 500;
		line-height: 18px;

		&:hover,
		&:focus {
			border: var(--wx-border);
			background: #f7f7f7;
		}

		&:active {
			background: #f1f1f1;
		}

		:global(i) {
			opacity: 1;
			color: #42454d;
		}
	}

	.btn-box :global(button.toggle-btn.link-btn) {
		padding: 7px 19px;
		border-radius: 4px;
		align-items: center;
	}
	.narrow .btn-box :global(button.toggle-btn.link-btn) {
		padding: 11px;
	}

	.btn-box :global(button.toggle-btn.link-btn div) {
		width: 16px;
		height: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.narrow .btn-box :global(button.toggle-btn.link-btn div) {
		width: 20px;
		height: 20px;
	}

	.btn-box :global(button.toggle-btn.link-btn img) {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	a {
		display: flex;
		text-decoration: none;
	}

	.wrapper-content {
		flex: 1;
		height: calc(100% - 60px);
	}

	.narrow .wrapper-content {
		height: calc(100% - 116px);
	}

	.content {
		position: relative;
		width: 100%;
		height: 100%;
		transition:
			transform 0.3s,
			width 0.3s;
		overflow-y: auto;

		:global(h4) {
			font-size: 16px;
			font-weight: 300;
			margin-bottom: 12px;
			border-bottom: var(--wx-border);
		}

		:global(h3) {
			font-size: 18px;
			margin: 12px 0;
			font-weight: normal;
		}
		:global(.demo-box) {
			margin: 20px;
		}
		:global(.demo-box + .demo-box) {
			margin-top: 40px;
		}
		:global(.demo-code) {
			font-family: monospace;
			line-height: 30px;
		}

		:global(.demo-status) {
			height: 30px;
			line-height: 30px;
			background: rgba(0, 0, 0, 0.15);
			padding-left: 10px;
		}

		:global(.demo-toolbar) {
			border: 2px solid var(--wx-background-alt);
			max-width: 600px;
		}

		:global(.demo-row) {
			display: flex;
			gap: 4px;
			flex-wrap: wrap;
		}

		:global(.demo-hscroll) {
			display: flex;
			gap: 4px;
			overflow-x: auto;
			padding-bottom: 4px;
			white-space: nowrap;
		}
	}

	.box-links {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.hint {
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		color: #42454d;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title {
		margin: 0;
		font-size: 18px;
		font-weight: 500;
		line-height: 24px;
		color: #42454d;
		white-space: nowrap;
	}

	.segmented-box {
		:global(div.segmented-themes) {
			height: 36px;
			padding: 2px;
			border-radius: 4px;
		}

		:global(div.segmented-themes button) {
			font-size: 14px;
			font-weight: 400;
			line-height: 18px;
			color: var(--wx-color-font-alt);
			background-color: transparent;
			padding: 7px 12px;
			border: none;
		}

		:global(div.segmented-themes button.wx-selected) {
			border-radius: 2px;
			font-weight: 500;
			color: var(--wx-color-font);
			background: #fff;
			box-shadow: 0px 0px 7px 0px rgba(66, 69, 76, 0.07);
		}

		:global(div.segmented-themes button svg) {
			height: 16px;
			width: 16px;
		}
	}

	.narrow .segmented-box {
		:global(div.segmented-themes) {
			height: 44px;
		}
		:global(div.segmented-themes button) {
			padding: 7px 10px;
		}
		:global(div.segmented-themes button svg) {
			height: 24px;
			width: 24px;
		}
	}
</style>
