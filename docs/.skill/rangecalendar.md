# SVAR Svelte Core RangeCalendar

Package: `@wx/svelte-core`

## Package

```js
import { RangeCalendar } from "@wx/svelte-core";
```

## Supported Functionality

-   Date range calendar with bindable `start` and `end`.
-   `months` is `1` or `2`; default is `2`.
-   Two-month mode renders left and right panels with synchronized months.
-   `buttons` defaults to `["clear", "today"]`; arrays can include `"done"`.
-   When `buttons` includes `"done"`, selection changes are held until the done action emits the final value.
-   Selection order is normalized: selecting an end before the start swaps `start` and `end`.
-   `markers(date)` can return a class string appended to `.wx-day`.
-   `onchange` receives `{ start: Date | null, end: Date | null }`.

## Public Types

```ts
import type { Component } from "svelte";

export declare const RangeCalendar: Component<{
	start?: Date;
	end?: Date;
	current?: Date;
	months?: 1 | 2;
	markers?: (date: Date) => string;
	buttons?: boolean | ("clear" | "today" | "done")[];
	onchange?: (ev: { start: Date | null; end: Date | null }) => void;
}>;
```

## Styling

-   Two-month wrapper: `.wx-rangecalendar`
-   Panel wrapper: `.wx-half`
-   Calendar panels use `.wx-calendar`, `.wx-wrap`, `.wx-buttons`, `.wx-button-item`
-   Month range states: `.wx-selected`, `.wx-left`, `.wx-right`, `.wx-inrange`

```svelte
<div class="range-shell">
	<RangeCalendar months={2} />
</div>

<style>
	.range-shell {
		--wx-calendar-cell-size: 30px;
	}
</style>
```

## Recipes

### Two-Month Range With Done Button

```svelte
<script>
	import { RangeCalendar } from "@wx/svelte-core";

	let start = $state(new Date(2025, 4, 1));
	let end = $state(new Date(2025, 4, 7));
</script>

<RangeCalendar
	bind:start
	bind:end
	months={2}
	buttons={["done", "clear", "today"]}
	onchange={ev => console.log(ev.start, ev.end)}
/>
```

### Single-Month Range

```svelte
<script>
	import { RangeCalendar } from "@wx/svelte-core";

	let start = $state();
	let end = $state();
</script>

<RangeCalendar
	bind:start
	bind:end
	months={1}
	buttons={false}
	onchange={ev => console.log(ev.start, ev.end)}
/>
```

## Implementation Notes

-   Source initializes the visible month from `start`, then `current`, then `new Date()`.
-   Clearing emits `{ start: null, end: null }`.
