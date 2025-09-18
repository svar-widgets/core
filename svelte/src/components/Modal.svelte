<script>
	import { onMount, getContext } from "svelte";
	import { fade } from "svelte/transition";
	import Button from "./Button.svelte";
	import { defaultLocale } from "./helpers/locale";

	const _ = (getContext("wx-i18n") || defaultLocale()).getGroup("core");

	const {
		title = "",
		buttons = ["cancel", "ok"],
		header,
		children,
		footer,
		onconfirm,
		oncancel,
	} = $props();

	function keydown(ev) {
		switch (ev.code) {
			case "Enter": {
				const from = ev.target.tagName;
				if (from === "TEXTAREA" || from === "BUTTON") return;
				onconfirm && onconfirm({ event: ev });
				break;
			}
			case "Escape":
				oncancel && oncancel({ event: ev });
				break;
		}
	}

	function onclick(ev, button) {
		const pack = { event: ev, button };
		if (button === "cancel") {
			oncancel && oncancel(pack);
		} else {
			onconfirm && onconfirm(pack);
		}
	}

	let modal;
	onMount(() => {
		modal.focus();
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="wx-modal"
	bind:this={modal}
	transition:fade={{ duration: 100 }}
	tabindex="0"
	onkeydown={keydown}
>
	<div class="wx-window">
		{#if header}
			{@render header()}
		{:else if title}
			<div class="wx-header">{title}</div>
		{/if}
		<div>
			{@render children()}
		</div>
		{#if footer}
			{@render footer()}
		{:else if buttons}
			<div class="wx-buttons">
				{#each buttons as button}
					<div class="wx-button">
						<Button
							type="block {button === 'ok'
								? 'primary'
								: 'secondary'}"
							onclick={ev => onclick(ev, button)}
						>
							{_(button)}
						</Button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.wx-modal {
		position: fixed;
		z-index: var(--wx-modal-z-index);
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: var(--wx-modal-backdrop);
		text-align: center;
	}

	.wx-window {
		background: var(--wx-modal-background);
		box-shadow: var(--wx-modal-shadow);
		border: var(--wx-modal-border);
		border-radius: var(--wx-modal-border-radius);
		padding: var(--wx-modal-padding);
		min-width: var(--wx-modal-width);
	}

	.wx-header {
		font-family: var(--wx-modal-header-font-family);
		font-size: var(--wx-modal-header-font-size);
		line-height: var(--wx-modal-header-line-height);
		font-weight: var(--wx-modal-header-font-weight);
		color: var(--wx-modal-header-font-color);
		margin-bottom: var(--wx-modal-gutter);
	}

	.wx-buttons {
		margin-top: var(--wx-modal-gutter);
		display: flex;
		justify-content: center;
		margin-left: calc(var(--wx-modal-gutter) / -2);
		margin-right: calc(var(--wx-modal-gutter) / -2);
	}

	.wx-button {
		flex: 1;
		max-width: 50%;
		padding: 0 calc(var(--wx-modal-gutter) / 2);
	}
</style>
