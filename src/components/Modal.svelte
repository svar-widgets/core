<script>
	import { onMount, getContext } from "svelte";
	import { fade } from "svelte/transition";
	import Button from "./Button.svelte";

	const _ = getContext("wx-i18n").getGroup("core");

	export let title = "";
	export let ok;
	export let cancel;
	export let buttons = ["cancel", "ok"];

	function keydown(e) {
		switch (e.code) {
			case "Enter": {
				const from = e.target.tagName;
				if (from === "TEXTAREA" || from === "BUTTON") return;
				ok();
				break;
			}
			case "Escape":
				cancel();
				break;
		}
	}

	let modal;
	onMount(() => {
		modal.focus();
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	class="wx-modal"
	bind:this={modal}
	transition:fade={{ duration: 100 }}
	tabindex="0"
	on:keydown={keydown}
>
	<div class="wx-window">
		<slot name="title">
			{#if title}
				<div class="wx-header">{title}</div>
			{/if}
		</slot>
		<div>
			<slot />
		</div>
		<slot name="buttons">
			<div class="wx-buttons">
				{#each buttons as button}
					<div class="wx-button">
						<Button
							type="block {button === 'ok'
								? 'primary'
								: 'secondary'}"
							click={() => (button === "ok" ? ok() : cancel())}
						>
							{_(button)}
						</Button>
					</div>
				{/each}
			</div>
		</slot>
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
