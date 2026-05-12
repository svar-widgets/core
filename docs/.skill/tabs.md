# SVAR Svelte Core Tabs

Package: `@wx/svelte-core`

## Package

```js
import { Tabs } from "@wx/svelte-core";
```

## Supported Functionality

-   Renders a tab strip only; render the tab panel yourself based on `value`.
-   `options` are `{ id, label?, title?, icon? }`.
-   `value` is the active tab id and is bindable.
-   Clicking a tab sets `value = option.id` and emits `onchange({ value })`.
-   `type` is `top` or `bottom`; default is `top`.
-   Icons use the same icon class pattern as other core controls.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Tabs: Component<{
	options?: {
		id: string | number;
		label?: string;
		title?: string;
		icon?: string;
	}[];
	value?: string | number;
	type?: "top" | "bottom";
	onchange?: (ev: { value: string | number }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-tabs`, plus `.wx-top` or `.wx-bottom`
-   Active button: `.wx-active`
-   Default icon: `.wx-icon`, icon-only modifier `.wx-only`
-   Default label: `.wx-label`

```svelte
<Tabs options={tabs} bind:value={active} />

<style>
	.wx-tabs {
		--wx-tabs-cell-min-width: 80px;
	}
</style>
```

## Recipes

### Tabs With Panels

```svelte
<script>
	import { Tabs } from "@wx/svelte-core";

	const tabs = [
		{ id: "info", label: "Info", icon: "wxi-alert" },
		{ id: "audit", label: "Audit" },
		{ id: "done", icon: "wxi-check", title: "Done" },
	];

	let active = $state("info");
</script>

<Tabs options={tabs} bind:value={active} />

{#if active === "info"}
	<div>Info panel</div>
{:else if active === "audit"}
	<div>Audit panel</div>
{:else}
	<div>Done panel</div>
{/if}

<Tabs options={tabs} bind:value={active} type="bottom" />
```

## Implementation Notes

-   `Tabs` has no `css` prop; style with an enclosing parent/global selector or theme variables.
