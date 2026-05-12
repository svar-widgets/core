# SVAR Svelte Core Pager

Package: `@wx/svelte-core`

## Package

```js
import { Pager } from "@wx/svelte-core";
```

## Supported Functionality

-   Pagination control with rows-per-page input, page navigation icons, current page input, and total page count.
-   `value` is the bindable current page; default is `1`.
-   `pageSize` is bindable; default is `20`.
-   `pageCount` is `Math.ceil(total / pageSize)`.
-   `from` is the zero-based row offset: `(value - 1) * pageSize`.
-   `to` is capped by `total`: `Math.min(value * pageSize, total)`.
-   Page navigation emits `{ value, from, to }` after updating the bound page.
-   Labels come from locale group `core`.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Pager: Component<{
	total?: number;
	pageSize?: number;
	value?: number;
	onchange?: (ev: { value: number; from: number; to: number }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-pager`
-   Sections: `.wx-left`, `.wx-center`, `.wx-right`
-   Navigation icons: `.wx-icon`, icon font classes `wxi-angle-dbl-left`, `wxi-angle-left`, `wxi-angle-right`, `wxi-angle-dbl-right`
-   Disabled icons: `.wx-disabled`
-   Inputs use local `input` styles inside the component.

```svelte
<div class="grid-footer">
	<Pager total={100} />
</div>

<style>
	.grid-footer .wx-pager {
		justify-content: flex-end;
	}
</style>
```

## Recipes

### Bound Page And Page Size

```svelte
<script>
	import { Pager } from "@wx/svelte-core";

	let page = $state(2);
	let pageSize = $state(10);
</script>

<Pager
	total={100}
	bind:value={page}
	bind:pageSize
	onchange={ev => console.log(ev.value, ev.from, ev.to)}
/>
```

## Implementation Notes

-   Page-size input calls `onchange` with `value` equal to the entered page size, not the active page.
-   Page navigation calls `onchange` with `value` equal to the active page.
-   Current-page input rejects values below `1`, above `pageCount`, or `NaN`.
