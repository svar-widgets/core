# SVAR Svelte Core ColorSelect

Package: `@wx/svelte-core`

## Package

```js
import { ColorSelect } from "@wx/svelte-core";
```

## Supported Functionality

-   Input-like color palette selector.
-   `value` is a bindable hex color string or empty string.
-   Default colors are `#00a037`, `#37a9ef`, `#f5a623`, `#ff4c3b`, `#a0a0a0`, `#000000`, `#ffffff`.
-   Clicking the input opens a `Dropdown` unless disabled.
-   Palette includes an empty color item that selects `""`.
-   `clear` shows a close icon when value is set and not disabled.
-   `onchange` emits `{ value }`.

## Public Types

```ts
import type { Component } from "svelte";

export declare const ColorSelect: Component<{
	colors?: string[];
	value?: string;
	id?: string | number;
	clear?: boolean;
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	onchange?: (ev: { value: string }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-colorselect`
-   Selected swatch: `.wx-selected`
-   Dropdown palette: `.wx-colors`
-   Swatch: `.wx-color`
-   Empty swatch: `.wx-empty`
-   Clear icon: `.wx-clear.wxi-close`

```svelte
<ColorSelect {colors} bind:value clear />

<style>
	.wx-colorselect .wx-color {
		border-radius: 50%;
	}
</style>
```

## Recipes

### Custom Palette

```svelte
<script>
	import { ColorSelect, Field } from "@wx/svelte-core";

	let color = $state("");
</script>

<Field label="Color" position="left">
	<ColorSelect
		colors={["#65D3B3", "#FFC975", "#58C3FE"]}
		bind:value={color}
		placeholder="Select a color"
		clear
	/>
</Field>
```
