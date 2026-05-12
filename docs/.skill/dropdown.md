# SVAR Svelte Core Dropdown

Package: `@wx/svelte-core`

## Package

```js
import { Dropdown } from "@wx/svelte-core";
```

## Supported Functionality

-   Anchored dropdown surface for arbitrary child content.
-   `position` is `top`, `right`, `bottom`, or `left`; default is `bottom`.
-   `align` is `start`, `center`, or `end`; default is `start`.
-   `width` defaults to `"100%"`.
-   Non-inline mode renders a `Portal` containing `Popup` anchored to the trigger's parent node.
-   `inline={true}` renders `.wx-dropdown` in place without `Portal`.
-   `trackScroll` is passed to `Popup` in non-inline mode.
-   `oncancel` is called by click-outside behavior and scroll tracking where enabled.

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

export declare const Dropdown: Component<
	DropdownOptions & {
		children?: () => any;
		oncancel?: (ev: MouseEvent) => void;
	}
>;
```

## Styling

-   Inline dropdown container: `.wx-dropdown`
-   Inline position classes: `.wx-top-start`, `.wx-top-center`, `.wx-top-end`, `.wx-bottom-start`, `.wx-bottom-center`, `.wx-bottom-end`, `.wx-left-start`, `.wx-left-center`, `.wx-left-end`, `.wx-right-start`, `.wx-right-center`, `.wx-right-end`
-   Non-inline dropdown uses `Popup`; `css` is appended to `.wx-popup`.
-   Hidden anchor marker: `.wx-portal-node`

```svelte
<Dropdown css="calendar-popup" width="300px">
	<div>Content</div>
</Dropdown>

<style>
	.wx-popup.calendar-popup {
		padding: 8px;
	}
</style>
```

## Recipes

### Anchored Dropdown

```svelte
<script>
	import { Button, Calendar, Dropdown } from "@wx/svelte-core";

	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open</Button>
{#if open}
	<Dropdown
		width="300px"
		position="bottom"
		align="start"
		css="calendar-popup"
		oncancel={() => (open = false)}
	>
		<Calendar />
	</Dropdown>
{/if}
```

### Inline Dropdown

```svelte
<script>
	import { Dropdown } from "@wx/svelte-core";
</script>

<div style="position: relative">
	<Dropdown inline width="200px" position="bottom" align="end">
		<div style="padding: 8px">Inline content</div>
	</Dropdown>
</div>
```

## Implementation Notes

-   Source supports `autoFit = true` for inline dropdowns; `DropdownOptions` does not declare `autoFit`.
-   `virtualized` is part of `DropdownOptions` for list helpers; `Dropdown` itself does not implement list virtualization.
