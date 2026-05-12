# SVAR Svelte Core Switch

Package: `@wx/svelte-core`

## Package

```js
import { Switch } from "@wx/svelte-core";
```

## Supported Functionality

-   Renders a labeled checkbox styled as a switch.
-   `value` is a bindable boolean.
-   `disabled` is forwarded to the hidden checkbox input.
-   `onchange` emits `{ value }` after the checked state changes.
-   `id` is used through the shared input id helper, so it can connect with a surrounding `Field`.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Switch: Component<{
	id?: string | number;
	value?: boolean;
	disabled?: boolean;
	onchange?: (ev: { value: boolean }) => void;
}>;
```

## Styling

-   Wrapper: `.wx-switch`
-   Internal elements are an invisible checkbox input and a visual `span`.

```svelte
<Switch bind:value />

<style>
	.wx-switch {
		--wx-switch-width: 56px;
	}
</style>
```

## Recipes

### Bound Switch In A Field

```svelte
<script>
	import { Field, Switch } from "@wx/svelte-core";

	let enabled = $state(true);
</script>

<Field label={`Enabled: ${enabled}`} position="left" type="switch">
	<Switch bind:value={enabled} onchange={ev => console.log(ev.value)} />
</Field>
```

## Implementation Notes

-   The component does not expose `css`; style through parent/global selectors or theme variables.
