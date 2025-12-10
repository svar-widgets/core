import { getContext } from "svelte";
import { uid } from "@svar-ui/lib-dom";

export function getInputId(id) {
	const register = getContext("wx-input-id");
	return id || (register && register()) || uid();
}
