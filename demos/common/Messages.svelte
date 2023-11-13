<script>
	import { Modal, Text, Area, Portal, Button } from "../../src/index";

	import { getContext } from "svelte";

	const { showNotice, showModal } = getContext("wx-helpers");

	function notice(type, text) {
		showNotice({
			type,
			expire: -1,
			text: text || "Button clicked",
		});
	}

	function confirm() {
		showModal({
			title: "Confirm",
			message: "Will we do it ?",
		});
	}
	function alert() {
		showModal({
			message: "Something happens",
			buttons: ["ok"],
		});
	}

	let custom1, custom2, box;
	function hideAll() {
		custom1 = custom2 = false;
	}

</script>

<div class="demo-box relative" bind:this={box}>
	<h4>Notice</h4>
	<Button type="primary" click={() => notice('')}>Show Notice</Button>
	<Button click={() => notice('info')}>Show Info</Button>
	<Button click={() => notice('warning')}>Show Warning</Button>
	<Button click={() => notice('success')}>Show Success</Button>
	<Button click={() => notice('danger')}>Show Danger</Button>
	<Button
		click={() => notice('info', 'very long text goes here to show word wrap')}>
		Show Long message
	</Button>
</div>

<div class="demo-box">
	<h4>Confirm / Alert</h4>
	<Button type="primary" click={confirm}>Show Confirm</Button>
	<Button click={alert}>Show Alert</Button>
</div>

<div class="demo-box">
	<h4>Custom dialog</h4>
	<Button type="primary" click={() => (custom1 = !custom1)}>
		Show Prompt
	</Button>
	{#if custom1}
		<Portal>
			<Modal title="Custom Prompt" ok={hideAll} cancel={hideAll}>
				<Text select={true} focus={true} value="Some" />
			</Modal>
		</Portal>
	{/if}

	<Button click={() => (custom2 = !custom2)}>Show Dialog</Button>
	{#if custom2}
		<Portal target={box}>
			<Modal>
				Some text here
				<Area placeholder="Some text" />
				<div slot="buttons" style="margin-top: 20px;">
					<Button click={hideAll}>Yes</Button>
					<Button click={hideAll}>No</Button>
					<Button click={hideAll}>Maybe</Button>
				</div>
			</Modal>
		</Portal>
	{/if}
</div>

<style>
	.relative {
		position: relative;
	}

</style>
