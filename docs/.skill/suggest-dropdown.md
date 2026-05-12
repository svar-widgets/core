# SVAR Svelte Core SuggestDropdown

Package: `@wx/svelte-core`

## Package

```js
import { SuggestDropdown } from "@wx/svelte-core";
```

## Supported Functionality

-   Low-level dropdown list helper used by `Combo`, `MultiCombo`, and `RichSelect`.
-   Renders only when navigation index is not `null`; callers open it through `onready.navigate`.
-   `items` are `{ id, label }`.
-   `onready` receives navigation helpers: `navigate`, `keydown`, and `move`.
-   `onselect` emits `{ id }`; in multiselect mode `id` is the next selected id array.
-   `multiselect` toggles id arrays instead of a single id.
-   `checkboxes` renders a non-interactive `Checkbox` in each row.
-   `virtualized` renders only visible rows with fixed measured item height and overscan.
-   `children` snippet receives `{ option }`.

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

export declare const SuggestDropdown: Component<
	DropdownOptions & {
		items?: { id: string | number; label: string }[];
		children?: () => any;
		onselect?: (ev: { id: string | number | (string | number)[] }) => void;
		onready?: (ev: {
			navigate?: (dir: number | null, ev?: KeyboardEvent) => void;
			keydown?: (ev: KeyboardEvent, dir: number) => void;
			move?: (ev: KeyboardEvent) => void;
		}) => void;
		multiselect?: boolean;
		checkboxes?: boolean;
		value?: string | number | (string | number)[];
		virtualized?: boolean;
	}
>;
```

## Styling

-   List container: `.wx-list`
-   Virtual wrapper/content: `.wx-list-wrapper`, `.wx-list-content`
-   Row: `.wx-item`
-   Focus row: `.wx-item.wx-focus`
-   Empty state: `.wx-no-data`
-   Non-inline dropdown `css` is appended to `.wx-popup`.

```svelte
<SuggestDropdown {items} css="suggest-menu" />

<style>
	.wx-popup.suggest-menu .wx-list {
		max-height: 180px;
	}
</style>
```

## Recipes

### Controlled Suggest Dropdown

```svelte
<script>
	import { SuggestDropdown } from "@wx/svelte-core";

	const items = [
		{ id: 1, label: "One" },
		{ id: 2, label: "Two" },
	];

	let api;
</script>

<button onclick={() => api.navigate(0)}>Open</button>

<SuggestDropdown
	{items}
	onready={ev => (api = ev)}
	onselect={ev => console.log(ev.id)}
/>
```

## Implementation Notes

-   Keyboard handlers use `ev.code` values `Enter`, `Space`, `Escape`, `Tab`, `ArrowDown`, and `ArrowUp`.
-   Virtual mode measures the first rendered item and assumes all rows have that height.
