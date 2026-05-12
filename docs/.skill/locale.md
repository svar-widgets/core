# SVAR Svelte Core Locale

Package: `@wx/svelte-core`

## Package

```js
import { Locale, locale, en } from "@wx/svelte-core";
```

For all bundled language packs, import from `@wx/core-locales`:

```js
import { en, cn, de, es, fr, it, ja, pt, ru } from "@wx/core-locales";
```

## Supported Functionality

-   `Locale` reads Svelte context `wx-i18n`.
-   If no locale context exists, it creates one from English words.
-   If `words` is not `null`, it extends the current locale with `words`.
-   `optional` is passed to the locale `extend` call.
-   Use `Locale` around the smallest subtree that needs different words or formats.
-   Locale affects calendar labels, date/time formats, modal buttons, pager labels, empty-list text, notices/modal helper strings, and color board select text.
-   `locale` is re-exported in JS from `@wx/lib-dom`.
-   `en` is re-exported in JS from `@wx/core-locales`.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Locale: Component<{
	words?: any;
	optional?: boolean;
	children?: () => any;
}>;

export type { ILocale, Terms, TPosition } from "@wx/lib-dom";
```

## Styling

-   `Locale` does not render a wrapper element or public classes.
-   It only changes locale context for children.
-   Styling changes that depend on locale direction or content length must be handled by app CSS or theme variables.

## Recipes

### Localize A Calendar Subtree

```svelte
<script>
	import { Calendar, Locale } from "@wx/svelte-core";
	import { de } from "@wx/core-locales";
</script>

<Locale words={de}>
	<Calendar value={new Date(2025, 4, 1)} />
</Locale>
```

### Override Date Formats

```svelte
<script>
	import { Calendar, Locale } from "@wx/svelte-core";
	import { cn } from "@wx/core-locales";

	const words = {
		...cn,
		formats: {
			...cn.formats,
			monthYearFormat: "%Y年%F",
			yearFormat: "%Y年",
		},
	};
</script>

<Locale {words}>
	<Calendar value={new Date(2025, 4, 1)} />
</Locale>
```

### Use The Locale Helper Directly

```svelte
<script>
	import { en, locale } from "@wx/svelte-core";

	const i18n = locale(en).extend(
		{
			core: {
				"Rows per page": "Rows",
			},
		},
		true
	);
	const _ = i18n.getGroup("core");
</script>

<span>{_("Rows per page")}</span>
```

## Implementation Notes

-   `Locale` renders only `children`; it has no DOM wrapper.

## Other information

extra details about locales can be obtained from `../locales.md`
