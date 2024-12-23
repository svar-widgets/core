<script>
	import { Modal, Text, TextArea, Portal, Button } from "../../src/index";

	import { getContext } from "svelte";

	const { showNotice, showModal } = getContext("wx-helpers");

	function notice(type, text) {
		showNotice({
			type,
			expire: -1,
			text: text || "Button clicked",
		});
	}

	async function confirm() {
		try {
			await showModal({
				title: "Confirm",
				message: "Will we do it ?",
			});
		} catch (er) {
			console.log("confirm was rejected", er);
		}
	}
	function alert() {
		showModal({
			message: "Something happens",
			buttons: ["ok"],
		});
	}

	let custom1 = $state(),
		custom2 = $state(),
		box = $state();
	function hideAll() {
		custom1 = custom2 = false;
	}
</script>

<div class="demo-box relative" bind:this={box}>
	<h3>Notice</h3>
	<Button type="primary" onclick={() => notice("")}>Show Notice</Button>
	<Button onclick={() => notice("info")}>Show Info</Button>
	<Button onclick={() => notice("warning")}>Show Warning</Button>
	<Button onclick={() => notice("success")}>Show Success</Button>
	<Button onclick={() => notice("danger")}>Show Danger</Button>
	<Button
		onclick={() =>
			notice("info", "very long text goes here to show word wrap")}
	>
		Show Long message
	</Button>
</div>

<div class="demo-box">
	<h3>Confirm / Alert</h3>
	<Button type="primary" onclick={confirm}>Show Confirm</Button>
	<Button onclick={alert}>Show Alert</Button>
</div>

<div class="demo-box">
	<h3>Custom dialog</h3>
	<Button type="primary" onclick={() => (custom1 = !custom1)}>
		Show Prompt
	</Button>
	{#if custom1}
		<Portal>
			<Modal title="Custom Prompt" onconfirm={hideAll} oncancel={hideAll}>
				<Text select={true} focus={true} value="Some" />
			</Modal>
		</Portal>
	{/if}

	<Button onclick={() => (custom2 = !custom2)}>Show Dialog</Button>
	{#if custom2}
		<Portal target={box}>
			<Modal>
				Some text here
				<TextArea placeholder="Some text" />
				{#snippet footer()}
					<div style="margin-top: 20px;">
						<Button onclick={hideAll}>Yes</Button>
						<Button onclick={hideAll}>No</Button>
						<Button onclick={hideAll}>Maybe</Button>
					</div>
				{/snippet}
			</Modal>
		</Portal>
	{/if}
</div>

<style>
	.relative {
		position: relative;
	}
</style>
