<script>
	import { setContext } from "svelte";

	import Notices from "./Notices.svelte";
	import Modal from "./Modal.svelte";

	import { uid } from "@svar-ui/lib-dom";

	let { children } = $props();

	let modal = $state(null);
	function showModal(msg) {
		modal = { ...msg };
		return new Promise((res, rej) => {
			modal.resolve = v => {
				modal = null;
				res(v);
			};
			modal.reject = v => {
				modal = null;
				rej(v);
			};
		});
	}

	let notices = $state([]);
	function showNotice(msg) {
		msg = { ...msg };
		msg.id = msg.id || uid();
		msg.remove = () => (notices = notices.filter(a => a.id !== msg.id));

		if (msg.expire != -1) {
			setTimeout(msg.remove, msg.expire || 5100);
		}
		notices = [...notices, msg];
	}

	setContext("wx-helpers", {
		showNotice,
		showModal,
	});
</script>

{@render children?.()}
{#if modal}
	<Modal
		title={modal.title}
		buttons={modal.buttons}
		onconfirm={modal.resolve}
		oncancel={modal.reject}
	>
		{modal.message}
	</Modal>
{/if}
<Notices data={notices} />
