import { getContext } from "svelte";
import { uid } from "@svar-ui/lib-dom";
import type { TID } from "../../types";

// the id is a string, as the DOM keeps it
export function getInputId(id?: TID): string {
	const contextId = getContext<TID | null>("wx-input-id");
	return `${id || contextId || uid()}`;
}
