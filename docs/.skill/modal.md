# SVAR Svelte Core Modal

Package: `@wx/svelte-core`

## Package

```js
import { Modal } from "@wx/svelte-core";
```

## Supported Functionality

-   Fixed-position backdrop and centered window.
-   `title` renders the default header unless a `header` snippet is supplied.
-   `children` renders the modal body.
-   `footer` snippet replaces the default button row.
-   `buttons` defaults to `["cancel", "ok"]`; pass `false` to hide default buttons.
-   Button id `"cancel"` calls `oncancel`; every other button id calls `onconfirm`.
-   Button labels are localized through locale group `core`.
-   Modal focuses itself on mount.
-   Enter calls `onconfirm` unless focus is inside a `TEXTAREA` or `BUTTON`; Escape calls `oncancel`.

## Public Types

```ts
import type { Component } from "svelte";
import type { Snippet } from "svelte";

export declare const Modal: Component<{
	title?: string;
	buttons?: boolean | string[];
	header?: Snippet<[]>;
	footer?: Snippet<[]>;
	children?: () => any;
	onconfirm?: (ev: { button?: string; event: MouseEvent }) => void;
	oncancel?: (ev: { button?: string; event: MouseEvent }) => void;
}>;
```

## Styling

-   Backdrop: `.wx-modal`
-   Window: `.wx-window`
-   Header: `.wx-header`
-   Button row: `.wx-buttons`
-   Button cell: `.wx-button`

```svelte
<Modal title="Confirm">
	<div>Continue?</div>
</Modal>

<style>
	.wx-modal .wx-window {
		--wx-modal-width: 360px;
	}
</style>
```

## Recipes

### Portal Modal With Default Buttons

```svelte
<script>
	import { Button, Modal, Portal } from "@wx/svelte-core";

	let open = $state(false);
</script>

<Button type="primary" onclick={() => (open = true)}>Show</Button>

{#if open}
	<Portal>
		<Modal
			title="Confirm"
			onconfirm={() => (open = false)}
			oncancel={() => (open = false)}
		>
			Continue?
		</Modal>
	</Portal>
{/if}
```

### Custom Header And Footer

```svelte
<script>
	import { Button, Modal } from "@wx/svelte-core";
</script>

<Modal buttons={false}>
	{#snippet header()}
		<h2>Custom Title</h2>
	{/snippet}

	<div>Body</div>

	{#snippet footer()}
		<Button type="primary">Apply</Button>
	{/snippet}
</Modal>
```

## Implementation Notes

-   Keyboard Enter/Escape handlers pass a keyboard event, while public types declare `MouseEvent`.
-   Button click handlers pass `{ button, event }`.
-   Default `"ok"` button is rendered as `type="block primary"`; other default buttons use `type="block secondary"`.
