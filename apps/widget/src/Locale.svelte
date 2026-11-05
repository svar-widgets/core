<script lang="ts">
	import { getContext, setContext, type Snippet } from "svelte";
	import { locale, type ILocale } from "@svar-ui/lib-dom";
	import { en } from "@svar-ui/core-locales";

	type Props = {
		words?: any;
		optional?: boolean;
		children?: Snippet;
	};

	let { words = null, optional = false, children }: Props = $props();

	let l = getContext<ILocale>("wx-i18n");
	// svelte-ignore state_referenced_locally
	if (!l || words !== null) {
		if (!l) {
			l = locale(en);
		}
		// svelte-ignore state_referenced_locally
		l = l.extend(words, optional);
		setContext("wx-i18n", l);
	}
</script>

{@render children?.()}
