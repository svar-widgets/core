# SVAR Svelte Core TextArea

Package: `@wx/svelte-core`

## Package

```js
import { TextArea } from "@wx/svelte-core";
```

## Supported Functionality

-   Renders a native `<textarea class="wx-textarea">`.
-   `value` is bindable.
-   `onchange` fires `{ value, input: true }` on input and `{ value }` on native change.
-   Supports `id`, `placeholder`, `title`, `disabled`, `error`, and `readonly`.
-   The textarea is vertically resizable unless disabled.

## Public Types

```ts
import type { Component } from "svelte";

export declare const TextArea: Component<{
	value?: string;
	id?: string | number;
	placeholder?: string;
	title?: string;
	disabled?: boolean;
	error?: boolean;
	readonly?: boolean;
	onchange?: (ev: { value: string; input?: boolean }) => void;
}>;
```

## Styling

-   Textarea: `.wx-textarea`
-   Error state: `.wx-textarea.wx-error`
-   Disabled state uses `[disabled]`.

```svelte
<TextArea placeholder="Details" />

<style>
	.wx-textarea {
		min-height: 140px;
	}
</style>
```

## Recipes

### TextArea In A Field

```svelte
<script>
	import { Field, TextArea } from "@wx/svelte-core";

	let details = $state("");
</script>

<Field label="Details" error>
	<TextArea
		bind:value={details}
		error
		title="Details are required"
		placeholder="Type here"
	/>
</Field>
```

## Implementation Notes

-   There is no `css` prop; style through a parent/global selector or theme variables.
