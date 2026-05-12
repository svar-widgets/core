# SVAR Svelte Core Calendar

Package: `@wx/svelte-core`

## Package

```js
import { Calendar } from "@wx/svelte-core";
```

## Supported Functionality

-   Full single-date calendar with header navigation and optional action buttons.
-   `value` is bindable and is a `Date` or `null`.
-   `current` is bindable and controls the visible month; source normalizes it to the first day of that month.
-   `buttons` defaults to `["clear", "today"]`; pass `false` to hide buttons or `true` for the default set.
-   `markers(date)` can return a CSS class string appended to the matching `.wx-day`.
-   `onchange` receives `{ value: Date | null }`.
-   Internally wraps the calendar panel in `Locale`, so it can work without an outer locale provider.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Calendar: Component<{
	value?: Date;
	current?: Date;
	markers?: (date: Date) => string;
	buttons?: boolean | ("clear" | "today")[];
	onchange?: (ev: { value: Date | null }) => void;
}>;
```

## Styling

-   Calendar wrapper: `.wx-calendar`
-   Layout: `.wx-wrap`, `.wx-buttons`, `.wx-button-item`
-   Header: `.wx-header`, `.wx-pager`, `.wx-spacer`, `.wx-label`
-   Month grid comes from `Month`: `.wx-weekdays`, `.wx-weekday`, `.wx-days`, `.wx-day`, `.wx-out`, `.wx-selected`, `.wx-weekend`, `.wx-inactive`
-   Year/month pickers: `.wx-months`, `.wx-month`, `.wx-years`, `.wx-year`, `.wx-current`, `.wx-prev-decade`, `.wx-next-decade`

```svelte
<div class="compact-calendar">
	<Calendar value={new Date(2025, 4, 1)} />
</div>

<style>
	.compact-calendar {
		--wx-calendar-cell-size: 28px;
		--wx-calendar-padding: 8px;
	}

	.compact-calendar .holiday {
		outline: 1px solid var(--wx-color-warning);
	}
</style>
```

## Recipes

### Mark Dates And Keep Visible Month Bound

```svelte
<script>
	import { Calendar } from "@wx/svelte-core";

	let value = $state(new Date(2025, 4, 1));
	let current = $state(new Date(2025, 4, 1));

	function markers(date) {
		return date.getDay() === 0 ? "holiday" : "";
	}
</script>

<Calendar
	bind:value
	bind:current
	{markers}
	buttons={["today"]}
	onchange={ev => console.log(ev.value)}
/>
```

### Hide Action Buttons

```svelte
<script>
	import { Calendar } from "@wx/svelte-core";
</script>

<Calendar buttons={false} onchange={ev => console.log(ev.value)} />
```

## Implementation Notes

-   Selecting a date clones it with `new Date(...)` before assigning `value`.
-   Clearing sets `value` to `null`.
-   Source calls `onchange` after updating the bindable `value`.
