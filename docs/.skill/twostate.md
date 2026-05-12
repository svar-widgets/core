# SVAR Svelte Core TwoState

Package: `@wx/svelte-core`

## Package

```js
import { TwoState } from "@wx/svelte-core";
```

## Supported Functionality

-   Wraps `Button` and toggles bindable boolean `value`.
-   When active, adds `pressed` to the forwarded `type`.
-   `textActive` and `iconActive` replace `text` and `icon` while active.
-   `children` renders inactive/default content; `active` snippet renders active content when `value` is true.
-   Click order: `onclick(ev)` first, then value toggle and `onchange({ value })`.
-   Calling `ev.preventDefault()` inside `onclick` prevents the toggle and `onchange`.

## Public Types

```ts
import type { Component } from "svelte";
import type { Snippet } from "svelte";

export declare const TwoState: Component<{
	value?: boolean;
	type?:
		| "primary"
		| "secondary"
		| "danger"
		| "link"
		| "primary block"
		| "secondary block"
		| "danger block"
		| "link block";
	icon?: string;
	disabled?: boolean;
	iconActive?: string;
	title?: string;
	css?: string;
	text?: string;
	textActive?: string;
	active?: Snippet<[]>;
	children?: () => any;
	onclick?: (ev: MouseEvent) => void;
	onchange?: (ev: { value: boolean }) => void;
}>;
```

## Styling

-   Uses `Button`, so styling hooks are `.wx-button` plus `.wx-pressed` when active.
-   `css` is passed to the inner `Button`.
-   Button type variables such as `--wx-button-pressed`, `--wx-button-primary-pressed`, and `--wx-button-box-shadow` control active state.

```svelte
<TwoState css="favorite-button" icon="wxi-star" iconActive="wxi-check" />

<style>
	.wx-button.favorite-button.wx-pressed {
		font-weight: 700;
	}
</style>
```

## Recipes

### Toggle With Active Content

```svelte
<script>
	import { TwoState } from "@wx/svelte-core";

	let active = $state(false);
</script>

<TwoState
	bind:value={active}
	type="primary"
	icon="wxi-star"
	iconActive="wxi-check"
	onchange={ev => console.log(ev.value)}
>
	Favorite
	{#snippet active()}
		Favorited
	{/snippet}
</TwoState>
```

### Prevent Toggle

```svelte
<script>
	import { TwoState } from "@wx/svelte-core";

	function beforeToggle(ev) {
		if (!confirm("Toggle?")) ev.preventDefault();
	}
</script>

<TwoState onclick={beforeToggle}>Toggle</TwoState>
```

## Implementation Notes

-   The active snippet is rendered only when `value` is true.
-   If `active` is not supplied, the component reuses `children` or `text` with active icon/text substitutions.
