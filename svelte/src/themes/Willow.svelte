<script>
	import { setContext } from "svelte";
	import FontOpenSans from "./FontOpenSans.svelte";

	let { fonts = true, children } = $props();
	setContext("wx-theme", "willow");
</script>

{#if children}
	<div class="wx-willow-theme" style="height:100%">
		{@render children()}
	</div>
{/if}

<svelte:head>
	{#if fonts}
		<link rel="preconnect" href="https://cdn.svar.dev" crossorigin />
		<FontOpenSans />
		<link
			rel="stylesheet"
			href="https://cdn.svar.dev/fonts/wxi/wx-icons.css"
		/>
	{/if}
</svelte:head>

<style>
	:global(.wx-willow-theme) {
		/* base colors */
		--wx-color-primary: #37a9ef;
		--wx-color-primary-selected: #d5eaf7;
		--wx-color-primary-font: #fff;
		--wx-color-secondary: transparent;
		--wx-color-secondary-hover: rgba(55, 169, 239, 0.12);
		--wx-color-secondary-font: var(--wx-color-primary);
		--wx-color-secondary-font-hover: var(--wx-color-primary);
		--wx-color-secondary-border: var(--wx-color-primary);
		--wx-color-secondary-border-disabled: #c0c3ce;

		--wx-color-success: #77d257;
		--wx-color-warning: #fcba2e;
		--wx-color-info: #37a9ef;
		--wx-color-danger: #fe6158;
		--wx-color-disabled: #f2f3f7;
		--wx-color-disabled-alt: #e9e9e9;

		--wx-color-font: #2c2f3c;
		--wx-color-font-alt: #9fa1ae;
		--wx-color-font-disabled: #c0c3ce;
		--wx-color-link: var(--wx-color-primary);

		--wx-background: #ffffff;
		--wx-background-alt: #f2f3f7;
		--wx-background-hover: #eaedf5;
		/* end base colors */

		/* font */
		--wx-font-family: "Open Sans", Arial, Helvetica, sans-serif;
		--wx-font-size: 14px;
		--wx-line-height: 20px;
		--wx-font-size-md: 14px;
		--wx-line-height-md: 24px;
		--wx-font-size-hd: 16px;
		--wx-line-height-hd: 30px;
		--wx-font-size-sm: 12px;
		--wx-line-height-sm: 16px;
		--wx-font-weight: 400;
		--wx-font-weight-md: 600;
		--wx-font-weight-b: 700;
		/* end font */

		/* icons */
		--wx-icon-color: #9fa1ae;
		--wx-icon-size: var(--wx-line-height);
		--wx-icon-border-radius: 2px;
		/* end icons */

		/* other */
		--wx-border: 1px solid #e6e6e6;
		--wx-border-radius: 3px;
		--wx-radius-major: 6px;

		--wx-border-light: none;
		--wx-border-medium: 1px solid #eaedf5;

		--wx-shadow-light: 0px 3px 10px 0px rgba(44, 47, 60, 0.12),
			0px 1px 2px 0px rgba(44, 47, 60, 0.06);
		--wx-shadow-medium: 0px 4px 20px 0px rgba(44, 47, 60, 0.12);
		/* LEGACY start */
		--wx-box-shadow: 0px 1px 2px rgba(44, 47, 60, 0.06),
			0px 3px 10px rgba(44, 47, 60, 0.12);
		--wx-box-shadow-strong: 0px 4px 20px rgba(44, 47, 60, 0.16);
		/* LEGACY END */

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
		--wx-input-background-disabled: var(--wx-color-disabled);
		--wx-input-placeholder-color: var(--wx-color-font-alt);
		--wx-input-border: var(--wx-border);
		--wx-input-border-focus: 1px solid var(--wx-color-primary);
		--wx-input-border-disabled: var(--wx-border);
		--wx-input-border-radius: 3px;
		--wx-input-height: 32px;
		--wx-input-width: 100%;
		--wx-input-padding: 5px 8px;
		--wx-input-icon-indent: 6px;
		--wx-input-icon-color: var(--wx-icon-color);
		--wx-input-icon-size: var(--wx-icon-size);
		/* end input */

		/* multi combo */
		--wx-multicombo-tag-gap: 3px;
		--wx-multicombo-tag-border: none;
		--wx-multicombo-tag-border-radius: var(--wx-input-border-radius);
		--wx-multicombo-tag-pading: 2px 8px;
		--wx-multicombo-tag-background: var(--wx-background-alt);
		/* end multi combo */

		/* checkbox and radio */
		--wx-checkbox-height: var(--wx-line-height);
		--wx-checkbox-size: var(--wx-checkbox-height);
		--wx-checkbox-border-width: 2px;
		--wx-checkbox-border-color: var(--wx-color-font-alt);
		--wx-checkbox-border-color-disabled: var(--wx-color-disabled);
		--wx-checkbox-border-radius: var(--wx-input-border-radius);
		--wx-checkbox-font-family: var(--wx-font-family);
		--wx-checkbox-font-size: var(--wx-font-size);
		--wx-checkbox-line-height: var(--wx-line-height);
		--wx-checkbox-font-weight: var(--wx-font-weight);
		--wx-checkbox-font-color: var(--wx-color-font);
		/* end checkbox and radio */

		/* label */
		--wx-label-width: 100px;
		--wx-label-margin: 0 0 4px;
		--wx-label-padding: 0;
		--wx-label-font-family: var(--wx-font-family);
		--wx-label-font-size: var(--wx-font-size);
		--wx-label-line-height: var(--wx-line-height);
		--wx-label-font-weight: var(--wx-font-weight-md);
		--wx-label-font-color: var(--wx-color-font);
		/* end label */

		/* button */
		--wx-button-font-family: var(--wx-font-family);
		--wx-button-font-size: var(--wx-font-size-md);
		--wx-button-line-height: var(--wx-line-height);
		--wx-button-font-weight: var(--wx-font-weight-md);
		--wx-button-text-transform: none;
		--wx-button-font-color: var(--wx-color-font);
		--wx-button-danger-font-color: #fff;
		--wx-button-background: var(--wx-background-alt);
		--wx-button-border: 1px solid transparent;
		--wx-button-border-radius: var(--wx-border-radius);
		--wx-button-height: 32px;
		--wx-button-padding: 5px 16px;
		--wx-button-icon-indent: 5px;
		--wx-button-icon-size: 20px;

		--wx-button-pressed: #d7dde3;
		--wx-button-danger-pressed: #cb4e46;
		--wx-button-primary-pressed: #098cdc;

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
		--wx-segmented-border: none;
		--wx-segmented-border-radius: 6px;
		--wx-segmented-padding: 0px;
		/* end segmented */

		/* tabs */
		--wx-tabs-background: var(--wx-background);
		--wx-tabs-background-hover: transparent;
		--wx-tabs-hover-border: #9fa1ae;
		--wx-tabs-border-width: 1px;
		--wx-tabs-border-radius: var(--wx-border-radius);
		--wx-tabs-divider-width: 1px;
		--wx-tabs-divider-height: 60%;
		--wx-tabs-divider-color: transparent;
		--wx-tabs-cell-min-width: 100px;
		--wx-tabs-active-background: transparent;
		--wx-tabs-active-color: var(--wx-color-primary);
		--wx-tabs-active-border: var(--wx-tabs-active-color);
		/* end tabs */

		/* slider */
		--wx-slider-height: 14px;
		--wx-slider-primary: var(--wx-color-primary);
		--wx-slider-background: var(--wx-background-alt);
		--wx-slider-track-height: 4px;
		--wx-slider-track-border-radius: 2px;
		--wx-slider-thumb-size: var(--wx-slider-height);
		--wx-slider-thumb-border: none;
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
		--wx-switch-background: #9fa1ae;
		--wx-switch-width: 48px;
		--wx-switch-height: 24px;
		--wx-switch-border-width: 0px;
		--wx-switch-border-color: transparent;
		--wx-switch-border-color-disabled: transparent;
		--wx-switch-thumb-offset: 1px;
		--wx-switch-thumb-border: none;
		--wx-switch-thumb-border-disabled: 1px solid #c0c3ce;
		--wx-switch-thumb-background: var(--wx-background);
		--wx-switch-thumb-background-disabled: var(--wx-color-disabled);
		--wx-switch-thumb-shadow: none;
		/* end switch */

		/* popup and dropdown */
		--wx-popup-z-index: 100;
		--wx-popup-background: var(--wx-background);
		--wx-popup-shadow: var(--wx-shadow-light);
		--wx-popup-border: 1px solid transparent;
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
		--wx-modal-backdrop: rgba(108, 114, 131, 0.2);
		--wx-modal-header-font-family: var(--wx-font-family);
		--wx-modal-header-font-size: var(--wx-font-size-hd);
		--wx-modal-header-line-height: var(--wx-line-height-hd);
		--wx-modal-header-font-weight: var(--wx-font-weight-b);
		--wx-modal-header-font-color: #000;
		/* end modal */

		/* notice */
		--wx-notice-z-index: 1010;
		--wx-notice-background: var(--wx-background);
		--wx-notice-shadow: var(--wx-shadow-medium);
		--wx-notice-border: none;
		--wx-notice-border-radius: 0 var(--wx-border-radius)
			var(--wx-border-radius) 0;
		--wx-notice-margin: 6px 12px;
		--wx-notice-font-family: var(--wx-font-family);
		--wx-notice-font-size: var(--wx-font-size);
		--wx-notice-line-height: var(--wx-line-height);
		--wx-notice-font-weight: var(--wx-font-weight);
		--wx-notice-font-color: var(--wx-color-font);
		--wx-notice-padding: 14px;
		--wx-notice-width: 240px;
		--wx-notice-icon-size: var(--wx-icon-size);
		--wx-notice-icon-color: var(--wx-icon-color);
		--wx-notice-type-border-width: 4px;
		--wx-notice-type-border-color: var(--wx-icon-color);
		--wx-notice-type-font-color: var(--wx-color-font);
		--wx-notice-type-icon-color: var(--wx-icon-color);
		--wx-notice-type-background-opacity: 0;
		--wx-notice-type-close-hover-opacity: 1;
		/* end notice */

		/* calendar */
		--wx-calendar-padding: 16px;
		--wx-calendar-cell-size: 32px;
		--wx-calendar-gap: 4px;
		--wx-calendar-line-gap: 4px;
		--wx-calendar-border-radius: var(--wx-border-radius);
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
		--wx-calendar-controls-font-size: var(--wx-font-size);
		--wx-calendar-controls-line-height: var(--wx-line-height);
		--wx-calendar-controls-font-weight: var(--wx-font-weight);
		--wx-calendar-controls-font-color: var(--wx-color-font);
		/* end calendar */
	}

	:global(.wx-willow-theme) {
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
			.wx-willow-theme *,
			.wx-willow-theme *:before,
			.wx-willow-theme *:after
		) {
		box-sizing: border-box;
	}
</style>
