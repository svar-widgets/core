# SVAR Svelte Core Portal

Package: `@wx/svelte-core`

## Package

```js
import { Portal, popupContainer } from "@wx/svelte-core";
```

## Supported Functionality

-   `Portal` moves its themed child node to `target` or the nearest `data-wx-portal-root` ancestor.
-   If no local portal root exists, source appends to the top node from `@wx/lib-dom` environment.
-   `theme` defaults from `wx-theme` context when not supplied.
-   Children receive an internal `{ mount }` callback argument in source.
-   `popupContainer(node)` marks a local portal root with a generated `data-wx-portal-root` attribute.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Portal: Component<{
	theme?: "willow" | "willow-dark";
	target?: HTMLElement;
	children?: () => any;
}>;

export declare function popupContainer(node: HTMLElement): void;
```

## Styling

-   Source wrapper `.wx-portal` is `display: none`.
-   Moved node receives `.wx-{theme}-theme`, such as `.wx-willow-theme`.
-   `popupContainer` has no class; it sets a data attribute.

```svelte
<div use:popupContainer class="local-root">
	<slot />
</div>
```

## Recipes

### Render A Modal Through Portal

```svelte
<script>
	import { Button, Modal, Portal } from "@wx/svelte-core";

	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open</Button>

{#if open}
	<Portal>
		<Modal title="Portal Modal" oncancel={() => (open = false)}>
			Content
		</Modal>
	</Portal>
{/if}
```

### Local Portal Root

```svelte
<script>
	import { DatePicker, popupContainer } from "@wx/svelte-core";
</script>

<div use:popupContainer class="local-root">
	<DatePicker />
</div>
```
