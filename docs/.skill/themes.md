# SVAR Svelte Core Themes

Package: `@wx/svelte-core`

## Package

```js
import { Willow, WillowDark } from "@wx/svelte-core";
```

## Supported Functionality

-   Theme components provide Svelte context `wx-theme`.
-   `Willow` sets `wx-theme` to `"willow"`.
-   `WillowDark` sets `wx-theme` to `"willow-dark"`.
-   When `children` are supplied, each theme renders `.wx-theme.wx-*-theme` with `height:100%`.
-   `fonts` defaults to `true`.
-   `Willow` and `WillowDark` load Open Sans font files and the `wxi` icon CSS.
-   Use `fonts={false}` when fonts/icons are already loaded or the app manages font loading.
-   Theme styling is CSS-variable driven; override variables on the theme wrapper or an ancestor around specific controls.

## Public Types

```ts
import type { Component } from "svelte";

export declare const Willow: Component<{
	fonts?: boolean;
	children?: () => any;
}>;

export declare const WillowDark: Component<{
	fonts?: boolean;
	children?: () => any;
}>;
```

## Styling

```svelte
<Willow fonts={false}>
	<div class="app-theme">
		<App />
	</div>
</Willow>

<style>
	.app-theme {
		--wx-color-primary: #0f766e;
		--wx-input-width: 280px;
		--wx-button-border-radius: 4px;
		--wx-calendar-cell-size: 30px;
	}
</style>
```

## Recipes

### Wrap An App In A Theme

```svelte
<script>
	import { Willow } from "@wx/svelte-core";
	import AppRoutes from "./AppRoutes.svelte";
</script>

<Willow>
	<AppRoutes />
</Willow>
```

### Dark Theme Without CDN Font Injection

```svelte
<script>
	import { WillowDark } from "@wx/svelte-core";
</script>

<WillowDark fonts={false}>
	<div class="screen">Dark UI</div>
</WillowDark>
```

## Other information

extra details about themes can be obtained from `../themes.md`
