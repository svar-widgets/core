# SVAR Svelte Core Radio

Package: `@wx/svelte-core`

Use this file standalone for `RadioButton` and `RadioButtonGroup`.

## Package

```js
import { RadioButton, RadioButtonGroup } from "@wx/svelte-core";
```

## Supported Functionality

-   `RadioButton.value` is a bindable boolean checked state.
-   `RadioButton.onchange` fires only when the radio becomes checked and emits `{ value: true, inputValue }`.
-   Standalone radio buttons need a shared `name` to behave as one browser radio group.
-   `RadioButtonGroup.options` are `{ id, label }`.
-   `RadioButtonGroup.value` is the selected option id.
-   Group `onchange` emits `{ value }`.
-   Group `type` supports `inline` and `grid`; default layout is one item per row.

## Public Types

```ts
import type { Component } from "svelte";

export declare const RadioButton: Component<{
	id?: string | number;
	label?: string;
	value?: boolean;
	name?: string;
	inputValue?: string | number;
	disabled?: boolean;
	onchange?: (ev: { value: boolean; inputValue: string | number }) => void;
}>;

export declare const RadioButtonGroup: Component<{
	options?: { id: string | number; label: string }[];
	value?: string | number;
	type?: "inline" | "grid";
	onchange?: (ev: { value: string | number }) => void;
}>;
```

## Styling

-   Radio wrapper: `.wx-radio`
-   Group wrapper: `.wx-radiogroup`, `.wx-radiogroup.wx-inline`, `.wx-radiogroup.wx-grid`
-   Group item wrapper: `.wx-item`

```svelte
<RadioButtonGroup {options} bind:value type="grid" />

<style>
	.wx-radiogroup.wx-grid .wx-item {
		flex-basis: 33.333%;
		max-width: 33.333%;
	}
</style>
```

## Recipes

### Standalone Radio Buttons

```svelte
<script>
	import { RadioButton } from "@wx/svelte-core";
</script>

<RadioButton label="One" name="mode" inputValue="one" value={true} />
<RadioButton label="Two" name="mode" inputValue="two" />
```

### Radio Group

```svelte
<script>
	import { RadioButtonGroup } from "@wx/svelte-core";

	const options = [
		{ id: 1, label: "Option 1" },
		{ id: 2, label: "Option 2" },
		{ id: 3, label: "Option 3" },
	];

	let value = $state(1);
</script>

<RadioButtonGroup {options} bind:value type="inline" />
```

## Implementation Notes

-   `RadioButtonGroup` does not pass disabled state through option objects.
