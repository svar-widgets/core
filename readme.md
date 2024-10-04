### :star: SVAR Core for Svelte

SVAR Core library offers a set of 20+ ready made UI components written in Svelte: form controls, popups, date and time picker, file uploader, and more.
All components are lightweight, responsive, fast-performing and available in light and dark skins.

<img src="https://cdn.svar.dev/public/core-ui-dark.jpg" alt="SVAR Core Library - Dark Skin" style="width: 600px;">

### :link: Useful Links

-   [Documentation](https://docs.svar.dev/svelte/core/overview)
-   [How to start guide](https://docs.svar.dev/svelte/core/getting_started/)
-   [Demos](https://docs.svar.dev/svelte/core/samples/#/calendar/willow)

### :page_with_curl: License

SVAR Core for Svelte is available under MIT license.

### How to Use

To use any of the widgets, simply import the package and include the desired component in your Svelte file:

```svelte
<script>
	import { Button } from "wx-svelte-core";
</script>

<Button>Click me</Button>
```

### How to Modify

Typically, you don't need to modify the code. However, if you wish to do so, follow these steps:

1. Run `yarn` to install dependencies. Note that this project is a monorepo using `yarn` workspaces, so npm will not work
2. Start the project in development mode with `yarn start`

### Run Tests

To run the test:

1. Start the test examples with:
    ```sh
    yarn start:tests
    ```
2. In a separate console, run the end-to-end tests with:
    ```sh
    yarn test:cypress
    ```
