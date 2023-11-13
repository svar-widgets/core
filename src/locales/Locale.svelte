<script>
	import { getContext, setContext } from "svelte";
	import { locale } from "@wx/lib-dom";
	import en from "./en";

	export let words = null;
	export let optional = false;

	let l = getContext("wx-i18n");
	if (!l) {
		l = locale(en);
	}
	l = l.extend(words, optional);
	setContext("wx-i18n", l);

</script>

<slot />
