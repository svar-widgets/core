# SVAR Svelte Core ColorPicker

Package: `@wx/svelte-core`

## Package

```js
import { ColorPicker } from "@wx/svelte-core";
```

## Supported Functionality

-   Input-like color picker that opens `ColorBoard` in a `Dropdown`.
-   `value` is a bindable color string.
-   The inner `ColorBoard` is rendered with `button="true"`.
-   `ColorPicker` ignores `ColorBoard` input events and updates only on the final select event.
-   Final selection closes the popup and emits `{ value }`.
-   `clear` shows a close icon when value is set and not disabled.
-   `dropdown` is forwarded to `Dropdown`.

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

export declare const ColorPicker: Component<{
	value?: string;
	id?: string | number;
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	clear?: boolean;
	dropdown?: DropdownOptions;
	onchange?: (ev: { value: string }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-colorpicker`
-   Selected swatch: `.wx-color`
-   Clear icon: `.wxi-close`
-   Input state classes: `.wx-focus`, `.wx-error`
-   Dropdown content uses `ColorBoard` hooks such as `.wx-colorboard`, `.wx-color-block`, `.wx-color-line`.

```svelte
<ColorPicker dropdown={{ css: "color-popup", width: "300px" }} />

<style>
	.wx-popup.color-popup {
		width: 300px;
	}
</style>
```

## Recipes

### Color Picker In A Field

```svelte
<script>
	import { ColorPicker, Field } from "@wx/svelte-core";

	let color = $state("#65D3B3");
</script>

<Field label="Color" position="left">
	<ColorPicker
		bind:value={color}
		placeholder="Select a color"
		clear
		onchange={ev => console.log(ev.value)}
	/>
</Field>
```

## Implementation Notes

-   `ColorPicker` displays the current `value` as swatch background without validating it.
