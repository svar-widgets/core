# SVAR Svelte Core Combo

Package: `@wx/svelte-core`

## Package

```js
import { Combo } from "@wx/svelte-core";
```

## Supported Functionality

-   Searchable single-select input backed by `SuggestDropdown`.
-   `options` are `{ id, label }` by default.
-   `textField` controls display/filter field; default is `"label"`.
-   `textOptions` can provide selected display objects when visible `options` are filtered or partial.
-   Typing filters `options` case-insensitively by `textField`.
-   Blur selects exact text match first, then first containing match, then previous value or first option.
-   Dropdown selection updates bindable `value` and emits `{ value }`.
-   `children` snippet receives `{ option }` for custom list row content.
-   `dropdown` is forwarded to `SuggestDropdown`/`Dropdown`.

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

export declare const Combo: Component<{
	value?: string | number;
	id?: string | number;
	options?: { id: string | number; label: string }[];
	textOptions?: { id: string | number; label: string }[];
	textField?: string;
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	clear?: boolean;
	dropdown?: DropdownOptions & {
		virtualized?: boolean;
	};
	children?: () => any;
	onchange?: (ev: { value: string | number }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-combo`
-   Icon: `.wx-icon`, close icon `.wxi-close`
-   Error class is applied to the input as `.wx-error`.
-   Dropdown list hooks from `SuggestDropdown`: `.wx-list`, `.wx-item`, `.wx-focus`, `.wx-no-data`.
-   Non-inline dropdown `css` is appended to `.wx-popup`.

```svelte
<Combo options={users} dropdown={{ css: "users-popup", width: "320px" }} />

<style>
	.wx-popup.users-popup .wx-list {
		max-height: 360px;
	}
</style>
```

## Recipes

### Custom Option Template And Virtualized List

```svelte
<script>
	import { Combo } from "@wx/svelte-core";

	const users = Array.from({ length: 10000 }, (_, id) => ({
		id,
		label: `User ${id}`,
		email: `user${id}@example.com`,
	}));

	let value = $state(9000);
</script>

<Combo
	options={users}
	bind:value
	dropdown={{ virtualized: true, width: "320px" }}
>
	{#snippet children({ option })}
		<div class="user-option">
			<strong>{option.label}</strong>
			<span>{option.email}</span>
		</div>
	{/snippet}
</Combo>
```

### Hidden Selected Option

```svelte
<script>
	import { Combo } from "@wx/svelte-core";

	const allUsers = [
		{ id: 87, label: "Berni Mayou" },
		{ id: 103, label: "Ned Stark" },
	];

	const visibleUsers = [{ id: 103, label: "Ned Stark" }];
</script>

<Combo textOptions={allUsers} options={visibleUsers} value={87} clear />
```

## Implementation Notes

-   Filtering assumes `option[textField]` is a string
