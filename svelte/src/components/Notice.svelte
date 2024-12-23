<script>
	import { fade } from "svelte/transition";
	let { notice = {} } = $props();

	function onRemove() {
		if (notice.remove) notice.remove();
	}
</script>

<div
	class="wx-notice wx-{notice.type ? notice.type : ''}"
	role="status"
	aria-live="polite"
	transition:fade
>
	<div class="wx-text">{notice.text}</div>
	<div class="wx-button">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<i class="wxi-close" onclick={onRemove}></i>
	</div>
</div>

<style>
	.wx-notice {
		position: relative;
		background: var(--wx-notice-background);
		box-shadow: var(--wx-notice-shadow);
		border: var(--wx-notice-border);
		border-radius: var(--wx-notice-border-radius);
		margin: var(--wx-notice-margin);
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
		font-family: var(--wx-notice-font-family);
		font-size: var(--wx-notice-font-size);
		line-height: var(--wx-notice-line-height);
		font-weight: var(--wx-notice-font-weight);
		color: var(--wx-notice-font-color);
		width: var(--wx-notice-width);
	}
	.wx-notice:before {
		content: "";
		display: block;
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
		width: var(--wx-notice-type-border-width);
		height: 100%;
		border-top-right-radius: var(--wx-notice-type-border-width);
		border-bottom-right-radius: var(--wx-notice-type-border-width);
		background: var(--wx-notice-type-border-color);
	}
	.wx-notice:after {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: var(--wx-notice-type-background-opacity);
		background: transparent;
	}

	.wx-text,
	.wx-button {
		position: relative;
		z-index: 2;
		padding: var(--wx-notice-padding);
	}

	.wx-text {
		flex-shrink: 0;
		word-wrap: break-word;
		max-width: calc(
			var(--wx-notice-width) - var(--wx-notice-padding) * 2 -
				var(--wx-notice-icon-size)
		);
	}

	.wxi-close {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: var(--wx-notice-icon-size);
		line-height: 1;
		width: var(--wx-notice-icon-size);
		height: var(--wx-notice-icon-size);
		color: var(--wx-notice-type-icon-color);
		cursor: pointer;
	}
	.wxi-close:before {
		display: block;
		z-index: 1;
	}
	.wxi-close:after {
		content: "";
		display: block;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		border-radius: var(--wx-icon-border-radius);
	}
	.wxi-close:hover:after {
		background: var(--wx-background-hover);
	}

	.wx-notice.wx-info,
	.wx-notice.wx-warning,
	.wx-notice.wx-success,
	.wx-notice.wx-danger {
		color: var(--wx-notice-type-font-color);
	}

	.wx-notice.wx-info:before,
	.wx-notice.wx-info:after {
		background: var(--wx-color-info);
	}
	.wx-notice.wx-warning:before,
	.wx-notice.wx-warning:after {
		background: var(--wx-color-warning);
	}
	.wx-notice.wx-success:before,
	.wx-notice.wx-success:after {
		background: var(--wx-color-success);
	}
	.wx-notice.wx-danger:before,
	.wx-notice.wx-danger:after {
		background: var(--wx-color-danger);
	}

	.wx-notice.wx-info .wxi-close:after,
	.wx-notice.wx-warning .wxi-close:after,
	.wx-notice.wx-success .wxi-close:after,
	.wx-notice.wx-danger .wxi-close:after {
		opacity: var(--wx-notice-type-close-hover-opacity);
	}
</style>
