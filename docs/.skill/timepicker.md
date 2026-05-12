# SVAR Svelte Core TimePicker

Package: `@wx/svelte-core`

## Package

```js
import { TimePicker } from "@wx/svelte-core";
```

## Supported Functionality

-   Input-like time picker backed by `Text`, `Dropdown`, `Slider`, and optional `TwoState`.
-   `value` is bindable and is a `Date`; only hours and minutes are used.
-   Default value is `new Date(0, 0, 0, 0, 0)` when `value` is nullish.
-   `format` can be a time format string or `(value: Date) => string`; locale time format is used by default.
-   Locale `calendar.clockFormat == 12` enables the AM/PM `TwoState`.
-   Hour and minute text inputs update on blur.
-   Hour and minute sliders update through `Slider.onchange`.
-   `dropdown` is forwarded to `Dropdown`; date/time dropdowns default width to `"unset"` when no width is provided.
-   `onchange` receives `{ value: Date }` after assigning the new bindable value.

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

export declare const TimePicker: Component<{
	value?: Date;
	id?: string | number;
	title?: string;
	css?: string;
	disabled?: boolean;
	error?: boolean;
	format?: string | ((value: Date) => string);
	dropdown?: DropdownOptions;
	onchange?: (ev: { value: Date }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-timepicker`
-   State classes: `.wx-disabled`, `.wx-error`
-   `css` is passed to the inner `Text`.
-   Popup content: `.wx-wrapper`, `.wx-timer`, `.wx-digit`, `.wx-separator`
-   Slider rows use `Field` and `Slider` classes.
-   AM/PM toggle uses `TwoState`/`Button` classes.

```svelte
<TimePicker css="time-input" dropdown={{ css: "time-popup", width: "260px" }} />

<style>
	.wx-text.time-input {
		--wx-input-width: 180px;
	}
</style>
```

## Recipes

### Bound Time

```svelte
<script>
	import { Field, TimePicker } from "@wx/svelte-core";

	let value = $state(new Date(0, 0, 0, 14, 30));
</script>

<Field label="Time" position="left">
	<TimePicker bind:value onchange={ev => console.log(ev.value)} />
</Field>
```

### Twelve-Hour Locale

```svelte
<script>
	import { Field, Locale, TimePicker } from "@wx/svelte-core";

	let value = $state(new Date(0, 0, 0, 14, 30));
</script>

<Locale
	words={{
		formats: { timeFormat: "%g:%i %a" },
		calendar: { clockFormat: 12 },
	}}
>
	<Field label="Time" position="left">
		<TimePicker bind:value dropdown={{ width: "100%" }} />
	</Field>
</Locale>
```

## Implementation Notes

-   The visible text is readonly; typed hour/minute edits happen only inside the popup.
