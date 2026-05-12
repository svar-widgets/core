# SVAR Svelte Core Segmented

Package: `@wx/svelte-core`

## Package

```js
import { Segmented } from "@wx/svelte-core";
```

## Supported Functionality

-   Renders an inline segmented button group.
-   `options` are `{ id, label, icon?, title? }`.
-   `value` is the selected id and is bindable.
-   Clicking an option sets `value = option.id` and emits `onchange({ value })`.
-   `css` is appended to `.wx-segmented`.
-   Default content renders `option.icon` and `option.label`.
-   `children` snippet receives `{ option }` for custom option content.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Segmented: Component<{
	options?: {
		id: string | number;
		label: string;
		icon?: string;
		title?: string;
	}[];
	value?: string | number;
	css?: string;
	children?: () => any;
	onchange?: (ev: { value: string | number }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-segmented`
-   Selected button: `.wx-selected`
-   Default icon: `.wx-icon`, icon-only modifier `.wx-only`
-   Default label: `.wx-label`

```svelte
<Segmented css="view-mode" {options} bind:value />

<style>
	.wx-segmented.view-mode {
		--wx-segmented-padding: 3px;
	}
</style>
```

## Recipes

### Basic Segmented Control

```svelte
<script>
	import { Segmented } from "@wx/svelte-core";

	const options = [
		{ id: "list", label: "List", icon: "wxi-view-sequential" },
		{ id: "grid", label: "Grid", icon: "wxi-view-grid" },
	];

	let value = $state("list");
</script>

<Segmented {options} bind:value onchange={ev => console.log(ev.value)} />
```

### Custom Option Content

```svelte
<script>
	import { Segmented } from "@wx/svelte-core";

	const options = [
		{ id: "left", label: "Left", icon: "wxi-align-left" },
		{ id: "right", label: "Right", icon: "wxi-align-right" },
	];
</script>

<Segmented {options} value="left">
	{#snippet children({ option })}
		<i class={option.icon}></i>
		<span>{option.label}</span>
	{/snippet}
</Segmented>
```
