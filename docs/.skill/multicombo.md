# SVAR Svelte Core MultiCombo

Package: `@wx/svelte-core`

## Package

```js
import { MultiCombo } from "@wx/svelte-core";
```

## Supported Functionality

-   Multi-select searchable input backed by `SuggestDropdown`.
-   `value` is a bindable array of selected ids.
-   `options` are `{ id, label }` by default.
-   `textField` controls display/filter field; default is `"label"`.
-   `textOptions` can provide selected tag display objects when visible `options` are partial.
-   Typing filters options case-insensitively by `textField`.
-   Selected options render as tags with remove icons.
-   `checkboxes` shows non-interactive checkboxes in dropdown rows.
-   `children` snippet receives `{ option }` for both tags and list rows.
-   `onchange` emits `{ value }`.

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

export declare const MultiCombo: Component<{
	id?: string | number;
	value?: (string | number)[];
	options?: { id: string | number; label: string }[];
	textOptions?: { id: string | number; label: string }[];
	textField?: string;
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	checkboxes?: boolean;
	dropdown?: DropdownOptions & {
		virtualized?: boolean;
	};
	children?: () => any;
	onchange?: (ev: { value: (string | number)[] }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-multicombo`
-   State classes: `.wx-focus`, `.wx-disabled`, `.wx-error`, `.wx-not-empty`
-   Border wrapper: `.wx-wrapper`
-   Tags wrapper: `.wx-tags`, tag `.wx-tag`
-   Input row: `.wx-select`
-   Icons: `.wx-icon`, `.wxi-close`
-   Dropdown list hooks: `.wx-list`, `.wx-item`, `.wx-focus`

```svelte
<MultiCombo {options} bind:value dropdown={{ css: "roles-popup" }} />

<style>
	.wx-multicombo .wx-tag {
		max-width: 180px;
	}
</style>
```

## Recipes

### Multi Select With Checkboxes

```svelte
<script>
	import { MultiCombo } from "@wx/svelte-core";

	const options = [
		{ id: "editor", label: "Editor" },
		{ id: "owner", label: "Owner" },
		{ id: "viewer", label: "Viewer" },
	];

	let roles = $state(["viewer"]);
</script>

<MultiCombo
	{options}
	bind:value={roles}
	checkboxes
	placeholder="Select roles"
/>
```

### Custom Tag And Row Content

```svelte
<script>
	import { MultiCombo } from "@wx/svelte-core";

	const users = [
		{ id: 104, label: "Lord Varys", email: "little.birds@mail" },
	];
</script>

<MultiCombo options={users} value={[104]}>
	{#snippet children({ option })}
		<strong>{option.label}</strong>
	{/snippet}
</MultiCombo>
```

## Implementation Notes

-   Filtering assumes `option[textField]` is a string
-   The source `onselect` path ignores falsy ids; avoid empty-string ids for selected options.
