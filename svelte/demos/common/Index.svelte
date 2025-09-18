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

	const { publicName, skins, productTag } = $props();
	let skin = $state(skins[0].id);
	let title = $state("");
	let link = $state("");
	let show = $state(true);

	const links = getLinks();

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
		document.body.className = `wx-willow-theme`;
	});
</script>

{#each skins as obj}
	<obj.component />
{/each}

<div class="layout" class:active={show}>
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
						href="https://svar.dev/svelte/core/"
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
					<Link {data} {skin} />
				{/each}
			</div>
		</div>
	</div>
	<div class="page-content">
		<div class="page-content-header">
			<div class="header-title-box">
				{#if !show}
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
					></Segmented>
				</div>

				<div class="btn-box">
					<a href={link} target="_blank" rel="noopener noreferrer">
						<Button type="secondary" css="toggle-btn">
							<img src={GitHubLogoIcon} alt="GitHub icon" />
							See code on GitHub
						</Button></a
					>
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
	.layout {
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

	.page-content-header {
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 40px;
		padding: 16px;
		border-bottom: 1px solid #ebebeb;
	}

	.header-title-box {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.header-actions-container {
		display: flex;
		align-items: center;
		gap: 16px;
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

	.sidebar-header {
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0px;
		padding: 19px 16px 19px 18px;
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

	.sidebar.active {
		width: 300px;
	}

	.sidebar-content {
		display: flex;
		flex-direction: column;
		width: 300px;
		gap: 16px;
		height: 100%;
		border-right: 1px solid #ebebeb;
		overflow-y: auto;
		font-family: Roboto, Arial, Helvetica, sans-serif;
		font-size: 16px;
		line-height: 20px;
		background-color: #fbfbfb;
		border-bottom: 1px solid #ebebeb;
	}

	.btn-box :global(button.toggle-btn) {
		display: flex;
		gap: 8px;
		border: 1px solid #ebebeb;
		color: #42454d;

		&:hover,
		&:focus {
			border: 1px solid #ebebeb;
			color: #42454d;
			background: #f7f7f7;
		}

		&:active {
			background: #f1f1f1;
		}
	}

	a {
		display: flex;
		text-decoration: none;
	}

	.wrapper-content {
		flex: 1;
		height: calc(100% - 70px);
	}

	.content {
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
	}

	.title {
		margin: 0;
		font-size: 18px;
		font-weight: 500;
		line-height: 24px;
		color: #42454d;
	}

	.segmented-box {
		:global(div.segmented-themes) {
			padding: 2px;
			border-radius: 4px;
		}

		:global(div.segmented-themes button) {
			font-size: 14px;
			font-weight: 400;
			line-height: 18px;
			color: #595b66;
			background-color: transparent;
		}

		:global(div.segmented-themes button.wx-selected) {
			border-radius: 2px;
			font-weight: 500;
			color: #42454d;
			background: #fff;
			box-shadow: 0px 0px 7px 0px rgba(66, 69, 76, 0.07);
		}
	}
</style>
