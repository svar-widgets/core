# SVAR Svelte Core DateRangePicker

Package: `@wx/svelte-core`

## Package

```js
import { DateRangePicker } from "@wx/svelte-core";
```

## Supported Functionality

-   Input-like date range picker backed by `Text`, `Dropdown`, and `RangeCalendar`.
-   `value` is bindable and is `{ start: Date; end?: Date }` or `null`.
-   `format` can be a date format string or `(date: Date) => string`; locale date format is used by default.
-   Display text is `start - end`; missing `end` displays only the start.
-   `months` is forwarded to `RangeCalendar` and is `1` or `2`.
-   `buttons` is forwarded to `RangeCalendar`; arrays can include `"done"`.
-   `editable={true}` parses committed text with `new Date(text)`.
-   `editable={fn}` uses the custom parser and expects `Date | null`.
-   Editable parsing splits text on `" -"`.
-   `clear` passes through to the inner `Text` clear icon.
-   `dropdown` is forwarded to `Dropdown`; date dropdowns default width to `"unset"` when no width is provided.
-   Popup closes on window scroll.
-   `onchange` receives `{ value: { start: Date; end: Date | null } | null }`.

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

export declare const DateRangePicker: Component<{
	value?: { start: Date; end?: Date };
	id?: string | number;
	disabled?: boolean;
	error?: boolean;
	width?: string;
	align?: "start" | "center" | "end";
	placeholder?: string;
	css?: string;
	title?: string;
	format?: string | ((date: Date) => string);
	months?: 1 | 2;
	buttons?: boolean | ("clear" | "today" | "done")[];
	editable?: boolean | ((value: string) => Date | null);
	clear?: boolean;
	dropdown?: DropdownOptions;
	onchange?: (ev: {
		value: { start: Date; end: Date | null } | null;
	}) => void;
}>;
```

## Styling

-   Wrapper: `.wx-daterangepicker`
-   State classes: `.wx-disabled`, `.wx-error`
-   `css` is passed to the inner `Text`.
-   Inner input classes come from `Text`: `.wx-text`, `.wx-input`, `.wx-icon`.
-   Popup surface uses `Dropdown`/`Popup` hooks such as `.wx-popup`.
-   Calendar hooks come from `RangeCalendar`, `Calendar`, and `Month`.

```svelte
<DateRangePicker css="range-input" dropdown={{ css: "range-popup" }} />

<style>
	.wx-text.range-input {
		--wx-input-width: 280px;
	}
</style>
```

## Recipes

### Two-Month Range Picker

```svelte
<script>
	import { DateRangePicker, Field } from "@wx/svelte-core";

	let value = $state({
		start: new Date(2025, 4, 1),
		end: new Date(2025, 4, 7),
	});
</script>

<Field label="Range" position="left">
	<DateRangePicker
		bind:value
		months={2}
		buttons={["done", "clear", "today"]}
		clear
		onchange={ev => console.log(ev.value)}
	/>
</Field>
```

### Editable Range

```svelte
<script>
	import { DateRangePicker } from "@wx/svelte-core";

	let value = $state();
</script>

<DateRangePicker
	bind:value
	editable
	placeholder="Start - end"
	dropdown={{ width: "unset", align: "start" }}
/>
```

## Implementation Notes

-   Public types include `width` and `align`, but source does not use those props directly; use `dropdown={{ width, align }}`.
-   If the popup closes while only `start` is selected, source emits the pending single-start range.
-   With a `"done"` button, `RangeCalendar` holds intermediate selection changes until done is pressed.
