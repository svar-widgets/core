# SVAR Svelte Core SideArea

Package: `@wx/svelte-core`

## Package

```js
import { SideArea } from "@wx/svelte-core";
```

## Supported Functionality

-   Absolute-position side panel for local layouts.
-   `position` public type supports only `"right"`; source defaults to `"right"`.
-   Clicking outside the panel calls `oncancel`.
-   Uses a fly transition from the right.
-   Renders arbitrary `children`.

## Public Types

```ts
import type { Component } from "svelte";

export declare const SideArea: Component<{
	position?: "right";
	children?: () => any;
	oncancel?: () => void;
}>;
```

## Styling

-   Panel: `.wx-sidearea`
-   Right position: `.wx-pos-right`

```svelte
<div class="side-host">
	<SideArea>
		<div class="side-content">Panel</div>
	</SideArea>
</div>

<style>
	.side-host {
		position: relative;
		min-height: 300px;
	}

	.side-content {
		width: 400px;
		padding: 20px;
	}
</style>
```

## Recipes

### Right-Side Local Panel

```svelte
<script>
	import { Button, SideArea } from "@wx/svelte-core";

	let open = $state(false);
</script>

<div style="position: relative; min-height: 300px">
	<Button onclick={() => (open = true)}>Open side panel</Button>

	{#if open}
		<SideArea oncancel={() => (open = false)}>
			<div style="width: 400px; padding: 20px">Panel content</div>
		</SideArea>
	{/if}
</div>
```
