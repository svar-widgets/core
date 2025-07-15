<script>
	import { setContext } from "svelte";
	import RobotoFont from "./FonttRoboto.svelte";

	let { fonts = true, children } = $props();
	setContext("wx-theme", "material");
</script>

{#if children}
	<div class="wx-material-theme" style="height:100%">
		{@render children()}
	</div>
{/if}

<svelte:head>
	{#if fonts}
		<link rel="preconnect" href="https://cdn.svar.dev" crossorigin />
		<RobotoFont />
		<link
			rel="stylesheet"
			href="https://cdn.svar.dev/fonts/wxi/wx-icons.css"
		/>
	{/if}
</svelte:head>

<style>
	:global(.wx-material-theme) {
		/* base colors */
		--wx-color-primary: #2f77e3;
		--wx-color-primary-selected: #d5e6ff;
		--wx-color-primary-font: #fff;
		--wx-color-secondary: rgba(0, 0, 0, 0.04);
		--wx-color-secondary-hover: rgba(0, 0, 0, 0.1);
		--wx-color-secondary-font: rgba(0, 0, 0, 0.7);
		--wx-color-secondary-font-hover: rgba(0, 0, 0, 0.7);
		--wx-color-secondary-border: transparent;
		--wx-color-secondary-border-disabled: transparent;

		--wx-color-success: #00d19a;
		--wx-color-warning: #ffc975;
		--wx-color-info: #37a9ef;
		--wx-color-danger: #ff5252;
		--wx-color-disabled: #ededed;
		--wx-color-disabled-alt: #e9e9e9;

		--wx-color-font: rgba(0, 0, 0, 0.7);
		--wx-color-font-alt: rgba(0, 0, 0, 0.5);
		--wx-color-font-disabled: rgba(0, 0, 0, 0.3);
		--wx-color-link: var(--wx-color-primary);

		--wx-background: #fff;
		--wx-background-alt: #f7f7f7;
		--wx-background-hover: linear-gradient(
			rgba(0, 0, 0, 0.15) 0%,
			rgba(0, 0, 0, 0.15) 100%
		);
		/* end base colors */

		/* font */
		--wx-font-family: Roboto, Arial, Helvetica, sans-serif;
		--wx-font-size: 14px;
		--wx-line-height: 20px;
		--wx-font-size-md: 16px;
		--wx-line-height-md: 24px;
		--wx-font-size-hd: 16px;
		--wx-line-height-hd: 30px;
		--wx-font-size-sm: 12px;
		--wx-line-height-sm: 16px;
		--wx-font-weight: 400;
		--wx-font-weight-md: 500;
		--wx-font-weight-b: 700;
		/* end font */

		/* icons */
		--wx-icon-color: var(--wx-color-font-alt);
		--wx-icon-size: var(--wx-line-height);
		--wx-icon-border-radius: 2px;
		/* end icons */

		/* other */
		--wx-border: 1px solid #dfdfdf;
		--wx-border-radius: 2px;
		--wx-radius-medium: var(--wx-border-radius);

		--wx-border-light: none;
		--wx-border-medium: 1px solid #eaedf5;

		--wx-shadow-light: 0px 4px 20px rgba(44, 47, 60, 0.12);
		--wx-shadow-medium: 0px 2px 4px rgba(0, 0, 0, 0.15);
		--wx-box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
		--wx-box-shadow-strong: 0px 2px 5px rgba(0, 0, 0, 0.3);

		--wx-padding: 8px;
		/* end other */

		/* field */
		--wx-field-gutter: 16px;
		--wx-field-width: 400px;
		/* end field */

		/* input */
		--wx-input-font-family: var(--wx-font-family);
		--wx-input-font-size: var(--wx-font-size);
		--wx-input-line-height: var(--wx-line-height);
		--wx-input-font-weight: var(--wx-font-weight);
		--wx-input-text-align: left;
		--wx-input-font-color: var(--wx-color-font);
		--wx-input-background: var(--wx-background);
		--wx-input-background-disabled: var(--wx-background);
		--wx-input-placeholder-color: var(--wx-color-font-alt);
		--wx-input-border: var(--wx-border);
		--wx-input-border-focus: 1px solid rgba(0, 0, 0, 0.5);
		--wx-input-border-disabled: 1px solid var(--wx-color-disabled);
		--wx-input-border-radius: var(--wx-border-radius);
		--wx-input-height: 32px;
		--wx-input-width: 100%;
		--wx-input-padding: 5px 8px;
		--wx-input-icon-indent: 6px;
		--wx-input-icon-color: var(--wx-icon-color);
		--wx-input-icon-size: var(--wx-icon-size);
		/* end input */

		/* multi combo */
		--wx-multicombo-tag-gap: 4px;
		--wx-multicombo-tag-border: none;
		--wx-multicombo-tag-border-radius: var(--wx-input-border-radius);
		--wx-multicombo-tag-pading: 2px 8px;
		--wx-multicombo-tag-background: var(--wx-background-alt);
		/* end multi combo */

		/* checkbox and radio */
		--wx-checkbox-height: var(--wx-line-height);
		--wx-checkbox-size: 18px;
		--wx-checkbox-border-width: 2px;
		--wx-checkbox-border-color: var(--wx-color-font-alt);
		--wx-checkbox-border-color-disabled: var(--wx-color-font-disabled);
		--wx-checkbox-border-radius: var(--wx-input-border-radius);
		--wx-checkbox-font-family: var(--wx-font-family);
		--wx-checkbox-font-size: var(--wx-font-size);
		--wx-checkbox-line-height: var(--wx-line-height);
		--wx-checkbox-font-weight: var(--wx-font-weight);
		--wx-checkbox-font-color: var(--wx-color-font);
		/* end checkbox and radio */

		/* label */
		--wx-label-width: 80px;
		--wx-label-margin: 0 0 8px;
		--wx-label-padding: 0;
		--wx-label-font-family: var(--wx-font-family);
		--wx-label-font-size: var(--wx-font-size);
		--wx-label-line-height: var(--wx-line-height);
		--wx-label-font-weight: var(--wx-font-weight-md);
		--wx-label-font-color: var(--wx-color-font);
		/* end label */

		/* button */
		--wx-button-font-family: var(--wx-font-family);
		--wx-button-font-size: var(--wx-font-size);
		--wx-button-line-height: var(--wx-line-height);
		--wx-button-font-weight: var(--wx-font-weight-md);
		--wx-button-text-transform: none;
		--wx-button-font-color: var(--wx-color-font);
		--wx-button-danger-font-color: #fff;
		--wx-button-background: var(--wx-background-alt);
		--wx-button-border: 1px solid transparent;
		--wx-button-border-radius: var(--wx-border-radius);
		--wx-button-height: 32px;
		--wx-button-padding: 5px 20px;
		--wx-button-icon-indent: 7px;
		--wx-button-icon-size: 16px;

		--wx-button-pressed: rgba(0, 0, 0, 0.16);
		--wx-button-danger-pressed: #cc4242;
		--wx-button-primary-pressed: #265fb6;

		--wx-button-box-shadow: -2px -2px 4px 0px rgba(255, 255, 255, 0.56) inset,
			2px 2px 3px 1px rgba(0, 0, 0, 0.12) inset;
		--wx-button-primary-box-shadow: -2px -2px 4px 0px rgba(
					255,
					255,
					255,
					0.26
				) inset,
			2px 2px 3px 1px rgba(0, 0, 0, 0.16) inset;
		/* end button */

		/* segmented */
		--wx-segmented-background: var(--wx-background-alt);
		--wx-segmented-background-hover: var(--wx-background-hover);
		--wx-segmented-border: var(--wx-border);
		--wx-segmented-border-radius: var(--wx-border-radius);
		--wx-segmented-padding: 3px;
		/* end segmented */

		/* tabs */
		--wx-tabs-background: var(--wx-background-alt);
		--wx-tabs-background-hover: var(--wx-background-hover);
		--wx-tabs-hover-border: transparent;
		--wx-tabs-border-width: 1px;
		--wx-tabs-border-radius: var(--wx-border-radius);
		--wx-tabs-divider-width: 1px;
		--wx-tabs-divider-height: 100%;
		--wx-tabs-divider-color: #dfdfdf;
		--wx-tabs-cell-min-width: 100px;
		--wx-tabs-active-background: var(--wx-color-primary);
		--wx-tabs-active-color: var(--wx-color-primary-font);
		--wx-tabs-active-border: transparent;
		/* end tabs */

		/* slider */
		--wx-slider-height: 16px;
		--wx-slider-primary: var(--wx-color-primary);
		--wx-slider-background: #dfdfdf;
		--wx-slider-track-height: 4px;
		--wx-slider-track-border-radius: 2px;
		--wx-slider-thumb-size: var(--wx-slider-height);
		--wx-slider-thumb-border: 2px solid var(--wx-background);
		--wx-slider-thumb-border-disabled: none;
		--wx-slider-thumb-shadow: var(--wx-box-shadow-strong);
		--wx-slider-label-margin: 0 0 5px;
		--wx-slider-label-font-family: var(--wx-font-family);
		--wx-slider-label-font-size: var(--wx-font-size);
		--wx-slider-label-line-height: var(--wx-line-height);
		--wx-slider-label-font-weight: var(--wx-font-weight-md);
		--wx-slider-label-font-color: var(--wx-color-font);
		/* end slider */

		/* switch */
		--wx-switch-primary: var(--wx-color-primary);
		--wx-switch-background: rgba(0, 0, 0, 0.3);
		--wx-switch-width: 44px;
		--wx-switch-height: 22px;
		--wx-switch-border-width: 1px;
		--wx-switch-border-color: transparent;
		--wx-switch-border-color-disabled: #dfdfdf;
		--wx-switch-thumb-offset: 1px;
		--wx-switch-thumb-border: none;
		--wx-switch-thumb-border-disabled: none;
		--wx-switch-thumb-background: var(--wx-background);
		--wx-switch-thumb-background-disabled: var(--wx-background);
		--wx-switch-thumb-shadow: var(--wx-box-shadow-strong);
		/* end switch */

		/* popup and dropdown */
		--wx-popup-z-index: 100;
		--wx-popup-background: var(--wx-background);
		--wx-popup-shadow: var(--wx-shadow-light);
		--wx-popup-border: none;
		--wx-popup-border-radius: var(--wx-border-radius);
		/* end popup and dropdown */

		/* modal */
		--wx-modal-z-index: 1000;
		--wx-modal-background: var(--wx-background);
		--wx-modal-shadow: var(--wx-shadow-medium);
		--wx-modal-border: none;
		--wx-modal-border-radius: var(--wx-border-radius);
		--wx-modal-width: 280px;
		--wx-modal-padding: 16px 20px;
		--wx-modal-gutter: 14px;
		--wx-modal-backdrop: rgba(0, 0, 0, 0.5);
		--wx-modal-header-font-family: var(--wx-font-family);
		--wx-modal-header-font-size: var(--wx-font-size-hd);
		--wx-modal-header-line-height: var(--wx-line-height-hd);
		--wx-modal-header-font-weight: var(--wx-font-weight);
		--wx-modal-header-font-color: #000;
		/* end modal */

		/* notice */
		--wx-notice-z-index: 1010;
		--wx-notice-background: var(--wx-background);
		--wx-notice-shadow: var(--wx-shadow-medium);
		--wx-notice-border: none;
		--wx-notice-border-radius: var(--wx-border-radius);
		--wx-notice-margin: 6px 12px;
		--wx-notice-font-family: var(--wx-font-family);
		--wx-notice-font-size: var(--wx-font-size);
		--wx-notice-line-height: var(--wx-line-height);
		--wx-notice-font-weight: var(--wx-font-weight);
		--wx-notice-font-color: var(--wx-color-font);
		--wx-notice-padding: var(--wx-padding);
		--wx-notice-width: 240px;
		--wx-notice-icon-size: var(--wx-icon-size);
		--wx-notice-icon-color: var(--wx-icon-color);
		--wx-notice-type-border-width: 0px;
		--wx-notice-type-border-color: transparent;
		--wx-notice-type-font-color: #fff;
		--wx-notice-type-icon-color: rgba(255, 255, 255, 0.8);
		--wx-notice-type-background-opacity: 1;
		--wx-notice-type-close-hover-opacity: 0.3;
		/* end notice */

		/* calendar */
		--wx-calendar-padding: 16px;
		--wx-calendar-cell-size: 32px;
		--wx-calendar-gap: 4px;
		--wx-calendar-line-gap: 0px;
		--wx-calendar-border-radius: var(--wx-calendar-cell-size);
		--wx-calendar-font-family: var(--wx-font-family);
		--wx-calendar-font-size: var(--wx-font-size);
		--wx-calendar-line-height: var(--wx-line-height);
		--wx-calendar-font-weight: var(--wx-font-weight);
		--wx-calendar-font-color: var(--wx-color-font);
		--wx-calendar-icon-color: var(--wx-icon-color);
		--wx-calendar-icon-size: var(--wx-icon-size);
		--wx-calendar-header-font-size: var(--wx-font-size);
		--wx-calendar-header-line-height: var(--wx-line-height);
		--wx-calendar-header-font-weight: var(--wx-font-weight-md);
		--wx-calendar-controls-font-family: var(--wx-button-font-family);
		--wx-calendar-controls-font-size: var(--wx-button-font-size);
		--wx-calendar-controls-line-height: var(--wx-button-line-height);
		--wx-calendar-controls-font-weight: var(--wx-button-font-weight);
		--wx-calendar-controls-font-color: var(--wx-color-link);
		/* end calendar */
	}

	:global(.wx-material-theme) {
		font-family: var(--wx-font-family);
		font-size: var(--wx-font-size);
		line-height: var(--wx-line-height);
		font-weight: var(--wx-font-weight);
		font-style: normal;
		letter-spacing: normal;
		text-align: left;
		color: var(--wx-color-font);
		background: var(--wx-background);
	}
	:global(
			.wx-material-theme *,
			.wx-material-theme *:before,
			.wx-material-theme *:after
		) {
		box-sizing: border-box;
	}
</style>
