import { getContext } from "svelte";
import { uid } from "@svar-ui/lib-dom";

export function getInputId(id) {
	const contextId = getContext("wx-input-id");
	return id || contextId || uid();
}
