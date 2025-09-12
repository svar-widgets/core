import { uid } from "@svar-ui/lib-dom";

export function popupContainer(node) {
	const id = uid();
	node.setAttribute("data-wx-portal-root", id);
}
