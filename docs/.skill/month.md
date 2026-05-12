# SVAR Svelte Core Month

Package: `@wx/svelte-core`

## Package

```js
import { Month } from "@wx/svelte-core";
```

## Supported Functionality

-   Low-level month grid used by `Calendar` and `RangeCalendar`.
-   `current` is the visible month; pass a date inside the month to render.
-   `part="normal"` is required for standalone single-date selection with `value={Date}`.
-   Range rendering uses `value={{ start, end }}` and `part` values such as `"left"`, `"right"`, or `"both"`.
-   `markers(date)` can return a CSS class string appended to `.wx-day`.
-   `onchange` receives a `Date` directly, not an object.
-   After selecting a date, source calls `oncancel()` if provided.
-   Weekday labels and week start come from locale context, falling back to the default locale.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Month: Component<{
	value?: { start: Date; end: Date } | Date;
	current?: Date;
	part?: string;
	markers?: (date: Date) => string;
	oncancel?: () => void;
	onchange?: (ev: Date) => void;
}>;
```

## Styling

-   Weekday row: `.wx-weekdays`, `.wx-weekday`
-   Day grid: `.wx-days`, `.wx-day`
-   Date state classes: `.wx-out`, `.wx-selected`, `.wx-left`, `.wx-right`, `.wx-inrange`, `.wx-weekend`, `.wx-inactive`
-   Marker classes from `markers(date)` are appended to `.wx-day`.

```svelte
<Month current={new Date(2025, 4, 1)} part="normal" {markers} />

<style>
	.wx-day.payday {
		font-weight: 700;
	}
</style>
```

## Recipes

### Standalone Single-Month Picker

```svelte
<script>
	import { Month } from "@wx/svelte-core";

	let value = $state(new Date(2025, 4, 15));
	let current = $state(new Date(2025, 4, 1));
</script>

<Month
	bind:value
	bind:current
	part="normal"
	onchange={date => (value = date)}
/>
```

### Range Markup Preview

```svelte
<script>
	import { Month } from "@wx/svelte-core";

	const value = {
		start: new Date(2025, 4, 10),
		end: new Date(2025, 4, 18),
	};
</script>

<Month
	{value}
	current={value.start}
	part="both"
	onchange={date => console.log(date)}
/>
```

## Implementation Notes

-   Source default `part` is `""`; that path treats `value` as a range object. Use `part="normal"` for a plain `Date`.
-   Days outside the current month get `.wx-out` and `.wx-inactive`.
-   `Month` does not render calendar header or action buttons; use `Calendar` or `RangeCalendar` for those.
