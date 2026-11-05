import { uid } from "@svar-ui/lib-dom";

export function popupContainer(node: HTMLElement) {
	const id = uid();
	node.setAttribute("data-wx-portal-root", `${id}`);
}
