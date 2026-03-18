<script>
	import {
		Globals,
		Willow,
		WillowDark,
		Locale,
		popupContainer,
		Button,
		Segmented,
	} from "@svar-ui/svelte-core";
	import Main from "./Main.svelte";
	import LogoIcon from "./icons/Logo.svelte";
	import WillowDarkIcon from "./icons/WillowDark.svelte";
	import WillowIcon from "./icons/Willow.svelte";

	let { productLink, publicName } = $props();
	let skin = $state("willow");

	const isStandalone = $state(window.self === window.top);
	const DEMO_SECTION_URL = `https://svar.dev/svelte/${productLink}/`;

	const skins = [
		{
			id: "willow",
			label: "Willow",
			component: Willow,
			icon: WillowIcon,
		},
		{
			id: "willow-dark",
			label: "Dark",
			component: WillowDark,
			icon: WillowDarkIcon,
		},
	];

	function goBack() {
		window.location.href = DEMO_SECTION_URL;
	}

	function changeSkin({ value }) {
		skin = value;
	}
</script>

<Willow />
<WillowDark />

<div
	class="wx-willow-theme content"
	class:standalone={isStandalone}
	use:popupContainer
>
	<Locale>
		<Globals>
			<div class="header">
				{#if isStandalone}
					<div class="header-content">
						<div class="btn-box">
							<Button
								type="secondary"
								css="btn-back"
								icon="wxi-angle-left"
								onclick={goBack}
							>
								<div class="btn-back-content">
									<LogoIcon />
									<span>Go to {publicName} page</span>
								</div>
							</Button>
						</div>
						<h1>SVAR Svelte {publicName} - Live Demo</h1>
					</div>
				{/if}
				<div class="header-actions">
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
								<span>{option.label}</span>
							{/snippet}
						</Segmented>
					</div>
				</div>
			</div>
			<div class="wx-{skin}-theme main-content">
				<Main />
			</div>
		</Globals>
	</Locale>
</div>

<style>
	* {
		-webkit-tap-highlight-color: transparent;
	}
	.content {
		height: 100%;
		width: 100%;
	}

	.header :global(*) {
		font-family: Roboto, Arial, Helvetica, sans-serif;
	}

	.header > div {
		height: 56px;
		display: flex;
		padding: 10px 16px;
		border-bottom: 1px solid #ebebeb;
	}
	.header-content {
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.header-content h1 {
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
	}

	.header-actions {
		justify-content: flex-end;
	}

	.btn-box {
		position: absolute;
		left: 16px;
	}

	.btn-box {
		:global(button.btn-back) {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 8px;
			padding: 6px;
			font-weight: 500;
			font-size: 14px;
			line-height: 18px;
			border: 1px solid #ebebeb;
			color: #2c2f3c;

			&:hover,
			&:focus {
				border: 1px solid #ebebeb;
				background: #f7f7f7;
			}
		}

		:global(button.btn-back i) {
			opacity: 1;
		}

		:global(button.btn-back .btn-back-content) {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 4px;
		}
	}

	.segmented-box {
		:global(.segmented-themes) {
			height: 36px;
			padding: 2px;
			border-radius: 4px;
		}

		:global(.segmented-themes button) {
			font-size: 14px;
			font-weight: 400;
			line-height: 18px;
			color: var(--wx-color-font-alt);
			background-color: transparent;
			padding: 5px 12px;
			border: none;
		}

		:global(.segmented-themes button.wx-selected) {
			border-radius: 2px;
			font-weight: 500;
			color: var(--wx-color-font);
			background: #fff;
			box-shadow: 0px 0px 7px 0px rgba(66, 69, 76, 0.07);
		}

		:global(.segmented-themes button span) {
			margin-left: 4px;
		}
		:global(div.segmented-themes button svg) {
			height: 16px;
			width: 16px;
		}
	}

	.main-content {
		height: calc(100% - 56px);
	}
	.standalone .main-content {
		height: calc(100% - 112px);
	}

	@media (max-width: 767px) {
		.segmented-box {
			:global(.segmented-themes button span) {
				display: none;
			}

			:global(div.segmented-themes button) {
				padding: 2px 7px;
			}
			:global(div.segmented-themes button svg) {
				height: 24px;
				width: 24px;
			}

			:global(div.segmented-themes button) {
				padding: 2px 7px;
			}
			:global(div.segmented-themes) {
				height: 44px;
			}
		}
		.btn-box :global(button.btn-back) {
			justify-content: center;
			width: 36px;
			height: 36px;
			padding: 0;
		}
		.btn-box :global(button.btn-back > .btn-back-content) {
			display: none;
		}
		.header h1 {
			white-space: nowrap;
		}
		.header .header-actions {
			height: 68px;
		}
		.standalone .main-content {
			height: calc(100% - 124px);
		}
	}
</style>
