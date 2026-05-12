# SVAR Svelte Core Icon

Package: `@wx/svelte-core`

## Package

```js
import { Icon } from "@wx/svelte-core";
```

## Supported Functionality

-   Renders `<i class="wx-icon {css}">`.
-   Use `css` for icon font classes such as `wxi-search`.
-   `title` is forwarded to the `<i>`.
-   `onclick` is forwarded to the `<i>`.
-   If `children` is provided, it is rendered inside the `<i>` and `role="img"` is added.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Icon: Component<{
	css?: string;
	title?: string;
	children?: () => any;
	onclick?: (ev: MouseEvent) => void;
}>;
```

## Styling

-   Icon class: `.wx-icon`
-   `css` is appended to `.wx-icon`.

```svelte
<Icon css="wxi-search app-icon" title="Search" />

<style>
	.wx-icon.app-icon {
		color: var(--wx-color-primary);
	}
</style>
```

## Recipes

### Clickable Icon

```svelte
<script>
	import { Icon } from "@wx/svelte-core";
</script>

<Icon
	css="wxi-information-outline"
	title="Info"
	onclick={() => console.log("info")}
/>
```

## Implementation Notes

-   The component intentionally uses an `<i>` rather than a button
