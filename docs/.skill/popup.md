# SVAR Svelte Core Popup

Package: `@wx/svelte-core`

## Package

```js
import { Popup } from "@wx/svelte-core";
```

## Supported Functionality

-   Low-level absolutely positioned popup surface.
-   Position is calculated with `calculatePosition` from `@wx/lib-dom`.
-   Use `parent` to anchor to an element, or use `left`/`top` with an `at` position.
-   `at` defaults to `"bottom"` in source.
-   `oncancel` is called by click-outside behavior.
-   `width` can be number, "auto" or percentage like `100%` - calculated from `parent.offsetWidth`.
-   `trackScroll`; when enabled hides on scroll outside of popup.

## Public Types

```ts
import { TPosition } from "@wx/lib-dom";
import type { Component } from "svelte";

export declare const Popup: Component<{
	left?: number;
	top?: number;
	at?: TPosition;
	css: string;
	width: number | string;
	trackScroll: boolean;
	parent?: HTMLElement;
	children?: () => any;
	oncancel?: (ev: MouseEvent) => void;
}>;
```

## Styling

-   Container: `.wx-popup`
-   Source appends `css` to `.wx-popup`.
-   Inline style sets `position:absolute`, calculated `top`, `left`, and `width`.

```svelte
<Popup parent={buttonNode} css="help-popup">
	<div class="body">Help</div>
</Popup>

<style>
	.wx-popup.help-popup {
		padding: 12px;
	}
</style>
```

## Recipes

### Popup Anchored To A Button

```svelte
<script>
	import { Button, Popup } from "@wx/svelte-core";

	let parent = $state(null);
</script>

<div bind:this={parent}>
	<Button>Anchor</Button>
</div>

{#if parent}
	<Popup {parent} at="bottom" oncancel={() => (parent = null)}>
		<div style="padding: 12px">Popup content</div>
	</Popup>
{/if}
```

## Implementation Notes

-   Use `Dropdown` for the common anchored dropdown case; it handles `Portal` and parent discovery.
