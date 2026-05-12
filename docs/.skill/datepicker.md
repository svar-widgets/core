# SVAR Svelte Core DatePicker

Package: `@wx/svelte-core`

## Package

```js
import { DatePicker } from "@wx/svelte-core";
```

## Supported Functionality

-   Input-like single-date picker backed by `Text`, `Dropdown`, and `Calendar`.
-   `value` is bindable and is a `Date` or `null`.
-   `format` can be a date format string or `(value: Date) => string`; locale date format is used by default.
-   `editable={true}` parses committed text with `new Date(text)`.
-   `editable={fn}` uses the custom parser and expects `Date | null`.
-   `clear` passes through to the inner `Text` clear icon.
-   `buttons` is forwarded to `Calendar`; default is `["clear", "today"]`.
-   `dropdown` is forwarded to `Dropdown`; date dropdowns default width to `"unset"` when no width is provided.
-   Popup closes on window scroll.
-   `onchange` receives `{ value: Date | null }` after the bindable value is updated.

## Public Types

```ts
import type { Component } from "svelte";

export interface DropdownOptions {
	inline?: boolean;
	position?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
	css?: string;
	width?: string | "unset" | "auto";
	trackScroll?: boolean;
	virtualized?: boolean;
}

export declare const DatePicker: Component<{
	value?: Date;
	id?: string | number;
	disabled?: boolean;
	error?: boolean;
	width?: string;
	align?: "start" | "center" | "end";
	placeholder?: string;
	format?: string | ((value: Date) => string);
	buttons?: boolean | ("clear" | "today")[];
	css?: string;
	title?: string;
	editable?: boolean | ((value: string) => Date | null);
	clear?: boolean;
	dropdown?: DropdownOptions;
	onchange?: (ev: { value: Date | null }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-datepicker`
-   `css` is passed to the inner `Text`; use `css="wx-icon-left"` for the left-icon input variant.
-   Inner input classes come from `Text`: `.wx-text`, `.wx-input`, `.wx-icon`, `.wx-error`, `.wx-disabled`, `.wx-focus`.
-   Popup surface uses `Dropdown`/`Popup` hooks such as `.wx-popup`.
-   Calendar hooks come from `Calendar` and `Month`.

```svelte
<DatePicker css="wx-icon-left date-input" dropdown={{ css: "date-popup" }} />

<style>
	.wx-text.date-input {
		--wx-input-width: 220px;
	}

	.wx-popup.date-popup {
		padding: 4px;
	}
</style>
```

## Recipes

### Bound Date In A Field

```svelte
<script>
	import { DatePicker, Field } from "@wx/svelte-core";

	let value = $state(new Date(2025, 4, 1));
</script>

<Field label="Date" position="left">
	<DatePicker bind:value clear onchange={ev => console.log(ev.value)} />
</Field>
```

### Editable Date With Custom Parser

```svelte
<script>
	import { DatePicker } from "@wx/svelte-core";

	let value = $state(new Date(2025, 4, 1));

	function parseDate(text) {
		const p = text.match(/(..)(..)(.+)/);
		return p ? new Date(p.slice(1, 4).join("/")) : null;
	}
</script>

<DatePicker
	bind:value
	editable={parseDate}
	format="%m%d%Y"
	clear
	dropdown={{ width: "280px", align: "start" }}
/>
```

## Implementation Notes

-   Public types include `width` and `align`, but source does not use those props directly; use `dropdown={{ width, align }}`.
-   Selecting the same date value does not emit `onchange`.
