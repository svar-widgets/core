# SVAR Svelte Core Field

Package: `@wx/svelte-core`

## Package

```js
import { Field } from "@wx/svelte-core";
```

## Supported Functionality

-   Wraps controls with label and control layout.
-   Default label position is top; `position="left"` creates a side label layout.
-   `width` sets inline width on the `.wx-field` wrapper.
-   `error` adds `.wx-error` and colors the label.
-   `required` adds `.wx-required` and appends a red `*` to the label.
-   `type="checkbox" | "slider" | "switch"` adjusts vertical padding for those controls in left-label layout.
-   Sets Svelte context `wx-input-id`; child controls that call `getInputId` share the generated id with the label.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Field: Component<{
	label?: string;
	position?: "left";
	width?: string;
	error?: boolean;
	type?: "checkbox" | "slider" | "switch";
	required?: boolean;
	children?: () => any;
}>;
```

## Styling

-   Wrapper: `.wx-field`
-   Side label modifier: `.wx-left`
-   State classes: `.wx-error`, `.wx-required`
-   Label: `.wx-label`
-   Control wrapper: `.wx-field-control`
-   Control type modifiers: `.wx-field-control.wx-checkbox`, `.wx-field-control.wx-slider`, `.wx-field-control.wx-switch`

```svelte
<Field label="Owner" position="left" width="480px">
	<slot />
</Field>

<style>
	.wx-field.wx-left > .wx-label {
		width: 140px;
	}
</style>
```

## Recipes

### Labeled Control

```svelte
<script>
	import { Field, Text } from "@wx/svelte-core";

	let name = $state("");
</script>

<Field label="Name" required>
	<Text bind:value={name} />
</Field>
```

### Nested Fields

```svelte
<script>
	import { Field, Text } from "@wx/svelte-core";
</script>

<Field label="Name">
	<Field label="First" position="left">
		<Text />
	</Field>
	<Field label="Last" position="left">
		<Text />
	</Field>
</Field>
```
