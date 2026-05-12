# SVAR Svelte Core Text

Package: `@wx/svelte-core`

## Package

```js
import { Text } from "@wx/svelte-core";
```

## Supported Functionality

-   Bindable `value`, with `string | number` public type.
-   `type` supports `text`, `number`, and `password`; default is `text`.
-   `onchange` fires `{ value, input: true }` on input and `{ value }` on native change.
-   `focus` and `select` focus/select the input after mount.
-   `clear` shows a close icon when the input has a value; clicking it sets `value = ""` and emits `{ value }`.
-   `icon` renders inside the input. It is right-aligned unless `css` includes `wx-icon-left`.
-   `inputStyle` is applied to the inner `<input>`.
-   `readonly`, `disabled`, `error`, `placeholder`, and `title` are forwarded to the input/wrapper.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Text: Component<{
	value?: string | number;
	id?: string | number;
	readonly?: boolean;
	focus?: boolean;
	select?: boolean;
	type?: "text" | "number" | "password";
	placeholder?: string;
	disabled?: boolean;
	error?: boolean;
	inputStyle?: string;
	title?: string;
	css?: string;
	icon?: string;
	clear?: boolean;
	onchange?: (ev: { value: string | number; input?: boolean }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-text`
-   State/classes: `.wx-error`, `.wx-disabled`, `.wx-clear`, `.wx-icon-left`, `.wx-icon-right`
-   Icon: `.wx-icon`; clear icon: `.wx-icon.wxi-close`
-   `css` is appended to `.wx-text`.

```svelte
<Text css="search-input wx-icon-left" icon="wxi-search" clear />

<style>
	.wx-text.search-input {
		--wx-input-width: 320px;
	}
</style>
```

## Recipes

### Text With Clear And Left Icon

```svelte
<script>
	import { Field, Text } from "@wx/svelte-core";

	let query = $state("");
</script>

<Field label="Search" position="left">
	<Text
		bind:value={query}
		placeholder="Type here"
		icon="wxi-search"
		css="wx-icon-left"
		clear
		onchange={ev => {
			if (!ev.input) console.log("final", ev.value);
		}}
	/>
</Field>
```

### Focus And Select On Mount

```svelte
<script>
	import { Text } from "@wx/svelte-core";
</script>

<Text value="Some value" focus select />
```

## Implementation Notes

-   `type="number"` still binds through the input value; account for string/number conversion in your app logic.
