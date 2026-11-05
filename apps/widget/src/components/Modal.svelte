<script lang="ts">
	import { onMount, getContext, type Snippet } from "svelte";
	import type { ILocale } from "@svar-ui/lib-dom";
	import { fade } from "svelte/transition";
	import Button from "./Button.svelte";
	import { defaultLocale } from "./helpers/locale";
	import type { IModalEvent } from "../types";

	type Props = {
		title?: string;
		buttons?: boolean | string[];
		header?: Snippet;
		children?: Snippet;
		footer?: Snippet;
		css?: string;
		onconfirm?: (ev: IModalEvent) => void;
		oncancel?: (ev: IModalEvent) => void;
	};

	const _ = (getContext<ILocale>("wx-i18n") || defaultLocale()).getGroup(
		"core"
	);

	const {
		title = "",
		buttons = ["cancel", "ok"],
		header,
		children,
		footer,
		css = "",
		onconfirm,
		oncancel,
	}: Props = $props();

	// Enter and Escape pass the keyboard event
	function keydown(ev: KeyboardEvent) {
		switch (ev.code) {
			case "Enter": {
				const from = (ev.target as HTMLElement).tagName;
				if (from === "TEXTAREA" || from === "BUTTON") return;
				onconfirm?.({ event: ev as unknown as MouseEvent });
				break;
			}
			case "Escape":
				oncancel?.({ event: ev as unknown as MouseEvent });
				break;
		}
	}

	function onclick(ev: MouseEvent, button: string) {
		const pack = { event: ev, button };
		if (button === "cancel") {
			oncancel?.(pack);
		} else {
			onconfirm?.(pack);
		}
	}

	let modal: HTMLElement;
	onMount(() => {
		modal.focus();
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="wx-modal {css}"
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
			{@render children?.()}
		</div>
		{#if footer}
			{@render footer()}
		{:else if buttons}
			<div class="wx-buttons">
				{#each buttons as string[] as button}
					<div class="wx-button">
						<Button
							type={button === "ok"
								? "primary block"
								: "secondary block"}
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
