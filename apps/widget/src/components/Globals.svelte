<script lang="ts">
	import { setContext, type Snippet } from "svelte";

	import Notices from "./Notices.svelte";
	import Modal from "./Modal.svelte";

	import { uid } from "@svar-ui/lib-dom";
	import type {
		IHelpers,
		IModalEvent,
		IModalMessage,
		INotice,
	} from "../types";

	type Props = {
		children?: Snippet;
	};

	let { children }: Props = $props();

	type TModal = IModalMessage & {
		resolve?: (v: IModalEvent) => void;
		reject?: (v: IModalEvent) => void;
	};

	let modal = $state<TModal | null>(null);
	function showModal(msg: IModalMessage) {
		modal = { ...msg };
		return new Promise((res, rej) => {
			modal!.resolve = v => {
				modal = null;
				res(v);
			};
			modal!.reject = v => {
				modal = null;
				rej(v);
			};
		});
	}

	let notices = $state<INotice[]>([]);
	function showNotice(msg: INotice) {
		msg = { ...msg };
		msg.id = msg.id || uid();
		msg.remove = () => (notices = notices.filter(a => a.id !== msg.id));

		if (msg.expire != -1) {
			setTimeout(msg.remove, msg.expire || 5100);
		}
		notices = [...notices, msg];
	}

	setContext<IHelpers>("wx-helpers", {
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
