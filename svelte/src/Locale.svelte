<script>
	import { getContext, setContext } from "svelte";
	import { locale } from "wx-lib-dom";
	import { en } from "wx-core-locales";

	let { words = null, optional = false, children } = $props();

	let l = getContext("wx-i18n");
	if (!l) {
		l = locale(en);
	}
	l = l.extend(words, optional);
	setContext("wx-i18n", l);
</script>

{@render children?.()}
