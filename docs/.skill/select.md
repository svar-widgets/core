# SVAR Svelte Core Select

Package: `@wx/svelte-core`

## Package

```js
import { Select } from "@wx/svelte-core";
```

## Supported Functionality

-   Renders a native `<select>` inside `.wx-select`.
-   `options` are `{ id, label }` by default.
-   `textField` changes the displayed field; default is `"label"`.
-   `value` is bindable and stores the selected option id.
-   `placeholder` is shown as an overlay when value is empty and not `0`.
-   `clear` shows a close icon when the component has a value and is not disabled.
-   `onchange` emits `{ value }`.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Select: Component<{
	value?: string | number;
	options?: { id: string | number; label: string }[];
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	textField?: string;
	clear?: boolean;
	id?: string | number;
	onchange?: (ev: { value: string | number }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-select`
-   Placeholder overlay: `.wx-placeholder`
-   Icon: `.wx-icon`, close icon `.wxi-close`
-   Error class is applied to the native `select` as `.wx-error`.

```svelte
<div class="owner-select">
	<Select options={users} bind:value clear />
</div>

<style>
	.owner-select .wx-select {
		--wx-input-width: 280px;
	}
</style>
```

## Recipes

### Native Select With Clear

```svelte
<script>
	import { Field, Select } from "@wx/svelte-core";

	const users = [
		{ id: 103, label: "Ned Stark" },
		{ id: 104, label: "Lord Varys" },
	];

	let owner = $state("");
</script>

<Field label="Owner" position="left">
	<Select
		options={users}
		bind:value={owner}
		placeholder="Select owner"
		clear
	/>
</Field>
```

## Implementation Notes

-   `Select` has no `css` prop; use a parent/global selector for styling.
