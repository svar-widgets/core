# SVAR Svelte Core ColorBoard

Package: `@wx/svelte-core`

## Package

```js
import { ColorBoard } from "@wx/svelte-core";
```

## Supported Functionality

-   HSV color board with hue line, saturation/value block, text input, preview, and optional select button.
-   `value` is bindable and defaults to `"#65D3B3"`.
-   Valid typed hex is normalized to uppercase `#RRGGBB`; 3-digit hex is expanded.
-   Moving sliders or typing a valid color emits `{ value, input: true }`.
-   With `button={true}`, clicking the select button emits a final `{ value }`.
-   Keyboard arrow keys move the focused block/line slider.

## Public Types

```ts
import type { Component } from "svelte";

export declare const ColorBoard: Component<{
	value?: string;
	button?: boolean;
	onchange?: (ev: { value: string; input?: boolean }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-colorboard`
-   Saturation/value block: `.wx-color-block`
-   Block slider: `.wx-color-block-slider.wx-slider`
-   Hue line: `.wx-color-line`
-   Hue slider: `.wx-color-line-slider.wx-slider`
-   Controls row: `.wx-color-controls`
-   Preview: `.wx-color`
-   Text input: `.wx-text`

```svelte
<div class="picker-board">
	<ColorBoard bind:value />
</div>

<style>
	.picker-board .wx-color-block {
		height: 180px;
	}
</style>
```

## Recipes

### Inline Color Board

```svelte
<script>
	import { ColorBoard } from "@wx/svelte-core";

	let value = $state("#48C8E2");
</script>

<div style="width: 300px">
	<ColorBoard
		bind:value
		onchange={ev => {
			if (!ev.input) console.log(ev.value);
		}}
	/>
</div>
```
