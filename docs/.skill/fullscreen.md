# SVAR Svelte Core Fullscreen

Package: `@wx/svelte-core`

## Package

```js
import { Fullscreen } from "@wx/svelte-core";
```

## Supported Functionality

-   Wraps content in a fullscreen-capable container.
-   Default toggle button uses `Button` with `css="wx-fullscreen-button"`.
-   Default icon switches between `wxi-expand` and `wxi-collapse`.
-   Custom `toggleButton` snippet receives `(toggleFullscreen, inFullscreen)`.
-   `hotkey` configures a scoped hotkey on the fullscreen wrapper through `@wx/lib-dom` hotkeys.
-   Tracks native `fullscreenchange` to keep `inFullscreen` in sync.

## Public Types

```ts
import type { Component } from "svelte";
import type { Snippet } from "svelte";

export declare const Fullscreen: Component<{
	toggleButton?: Snippet<[(ev: MouseEvent) => void, boolean]>;
	children?: () => any;
	hotkey?: string;
}>;
```

## Styling

-   Wrapper: `.wx-fullscreen`
-   Default button: `.wx-fullscreen-button`
-   Default icon: `.wx-fullscreen-icon`
-   Fullscreen backdrop selector: `.wx-fullscreen::backdrop`
-   Wrapper is `position: relative`, `height: 100%`, `width: 100%`, `tabindex="-1"`.
-   Default button is absolutely positioned at bottom right.

```svelte
<Fullscreen>
	<div class="report">Report content</div>
</Fullscreen>

<style>
	.wx-fullscreen .wx-fullscreen-button {
		right: 12px;
		bottom: 12px;
	}
</style>
```

## Recipes

### Custom Toggle Button

```svelte
<script>
	import { Button, Fullscreen } from "@wx/svelte-core";
</script>

<Fullscreen hotkey="ctrl+shift+f">
	<div class="panel">Report content</div>

	{#snippet toggleButton(toggle, inFullscreen)}
		<Button onclick={toggle}>
			{inFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
		</Button>
	{/snippet}
</Fullscreen>
```

## Implementation Notes

-   `toggleFullscreen` calls `node.requestFullscreen()` and `document.exitFullscreen()`.
