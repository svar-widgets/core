# SVAR Svelte Core Slider

Package: `@wx/svelte-core`

## Package

```js
import { Slider } from "@wx/svelte-core";
```

## Supported Functionality

-   Renders an input range with optional label.
-   Bindable `value`, default `0`.
-   `min` defaults to `0`, `max` to `100`, `step` to `1`.
-   `width` sets inline width on `.wx-slider`.
-   During drag, `onchange` emits `{ value, previous, input: true }`.
-   On final change, `onchange` emits `{ value, previous }`.
-   `previous` tracks the previous input/final value separately for drag and final changes.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Slider: Component<{
	id?: string | number;
	label?: string;
	width?: string;
	min?: number;
	max?: number;
	value?: number;
	step?: number;
	title?: string;
	disabled?: boolean;
	onchange?: (ev: {
		value: number;
		previous: number;
		input?: boolean;
	}) => void;
}>;
```

## Styling

-   Wrapper: `.wx-slider`
-   Inner range input is styled through input pseudo-elements.
-   Label is a native `label` inside `.wx-slider`.

```svelte
<Slider width="240px" bind:value />

<style>
	.wx-slider {
		--wx-slider-thumb-size: 18px;
	}
</style>
```

## Recipes

### Slider With Drag And Final Events

```svelte
<script>
	import { Field, Slider } from "@wx/svelte-core";

	let progress = $state(50);
</script>

<Field label="Progress" position="left" type="slider">
	<Slider
		label={`Progress: ${progress}%`}
		bind:value={progress}
		min={0}
		max={100}
		onchange={ev => {
			if (ev.input) console.log("drag", ev.previous, ev.value);
			else console.log("final", ev.previous, ev.value);
		}}
	/>
</Field>
```
