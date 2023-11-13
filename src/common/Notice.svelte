<script>
	import { fade } from "svelte/transition";
	export let notice = {};

	function onRemove() {
		if (notice.remove) notice.remove();
	}

</script>

<div
	class="message {notice.type ? notice.type : ''}"
	role="status"
	aria-live="polite"
	transition:fade>
	<div class="text">{notice.text}</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="button"><i class="close wxi-close" on:click={onRemove} /></div>
</div>

<style>
	.message {
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
	.message:before {
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
	.message:after {
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

	.text,
	.button {
		position: relative;
		z-index: 2;
		padding: var(--wx-notice-padding);
	}

	.text {
		flex-shrink: 0;
		word-wrap: break-word;
		max-width: calc(
			var(--wx-notice-width) - var(--wx-notice-padding) * 2 -
				var(--wx-notice-icon-size)
		);
	}

	.close {
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
	.close:before {
		display: block;
		z-index: 1;
	}
	.close:after {
		content: "";
		display: block;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		border-radius: 50%;
	}
	.close:hover:after {
		background: var(--wx-background-hover);
	}

	.message.info,
	.message.warning,
	.message.success,
	.message.danger {
		color: var(--wx-notice-type-font-color);
	}

	.message.info:before,
	.message.info:after {
		background: var(--wx-color-info);
	}
	.message.warning:before,
	.message.warning:after {
		background: var(--wx-color-warning);
	}
	.message.success:before,
	.message.success:after {
		background: var(--wx-color-success);
	}
	.message.danger:before,
	.message.danger:after {
		background: var(--wx-color-danger);
	}

	.message.info .close:after,
	.message.warning .close:after,
	.message.success .close:after,
	.message.danger .close:after {
		opacity: var(--wx-notice-type-close-hover-opacity);
	}

</style>
