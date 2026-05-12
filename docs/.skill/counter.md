# SVAR Svelte Core Counter

Package: `@wx/svelte-core`

## Package

```js
import { Counter } from "@wx/svelte-core";
```

## Supported Functionality

-   Numeric input with decrement and increment buttons.
-   Bindable `value`, default `0`.
-   `step` defaults to `1`, `min` defaults to `0`, `max` defaults to `Infinity`.
-   Button clicks update `value` and emit `{ value }`.
-   Typing emits `{ value, input: true }` without immediately mutating the bound value in the handler payload path.
-   Blur normalizes the bound value to min/max and step, then emits `{ value }`.
-   `readonly` blocks button changes and blur normalization.
-   `disabled` disables the input and both buttons.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Counter: Component<{
	id?: string | number;
	value?: number;
	step?: number;
	min?: number;
	max?: number;
	error?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	onchange?: (ev: { value: number; input?: boolean }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-counter`
-   State classes: `.wx-disabled`, `.wx-readonly`, `.wx-error`
-   Input: `.wx-input`
-   Buttons: `.wx-btn`, `.wx-btn-dec`, `.wx-btn-inc`
-   SVG icons: `.wx-dec`, `.wx-inc`

```svelte
<Counter bind:value min={0} max={30} />

<style>
	.wx-counter .wx-input {
		width: 64px;
	}
</style>
```

## Recipes

### Counter With Final Change Handling

```svelte
<script>
	import { Counter, Field } from "@wx/svelte-core";

	let count = $state(5);
</script>

<Field label="Quantity">
	<Counter
		bind:value={count}
		min={0}
		max={30}
		step={3}
		onchange={ev => {
			if (!ev.input) console.log(ev.value);
		}}
	/>
</Field>
```
