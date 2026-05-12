# SVAR Svelte Core Checkbox

Package: `@wx/svelte-core`

Use this file standalone for `Checkbox` and `CheckboxGroup`.

## Package

```js
import { Checkbox, CheckboxGroup } from "@wx/svelte-core";
```

## Supported Functionality

-   `Checkbox.value` is a bindable boolean.
-   `Checkbox.inputValue` is emitted alongside the checked state; default is an empty string.
-   `Checkbox.onchange` emits `{ value, inputValue }`.
-   `CheckboxGroup.options` are `{ id, label }`.
-   `CheckboxGroup.value` is a bindable array of selected option ids.
-   Group `onchange` emits `{ value }`.
-   Group `type` supports `inline` and `grid`; default layout is one item per row.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Checkbox: Component<{
	id?: string | number;
	label?: string;
	inputValue?: string | number;
	value?: boolean;
	style?: string;
	disabled?: boolean;
	onchange?: (ev: { value: boolean; inputValue: string | number }) => void;
}>;

export declare const CheckboxGroup: Component<{
	options?: { id: string | number; label: string }[];
	value?: (string | number)[];
	type?: "inline" | "grid";
	onchange?: (ev: { value: (string | number)[] }) => void;
}>;
```

## Styling

-   Checkbox wrapper: `.wx-checkbox`
-   `style` prop is applied to the checkbox wrapper.
-   Group wrapper: `.wx-checkboxgroup`, `.wx-checkboxgroup.wx-inline`, `.wx-checkboxgroup.wx-grid`
-   Group item wrapper: `.wx-item`

```svelte
<div class="todo-checks">
	<CheckboxGroup {options} bind:value />
</div>

<style>
	.todo-checks .wx-checkboxgroup .wx-item {
		margin-top: 8px;
	}
</style>
```

## Recipes

### Single Checkbox

```svelte
<script>
	import { Checkbox } from "@wx/svelte-core";

	let done = $state(false);
</script>

<Checkbox
	label="Done"
	inputValue="done"
	bind:value={done}
	onchange={ev => console.log(ev.value, ev.inputValue)}
/>
```

### Checkbox Group

```svelte
<script>
	import { CheckboxGroup } from "@wx/svelte-core";

	const options = [
		{ id: "new", label: "New" },
		{ id: "open", label: "Open" },
		{ id: "done", label: "Done" },
	];

	let selected = $state(["new"]);
</script>

<CheckboxGroup {options} bind:value={selected} type="inline" />
```

## Implementation Notes

-   `CheckboxGroup` does not pass disabled state through option objects.
