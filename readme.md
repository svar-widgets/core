<div align="center">
	
# SVAR Svelte Core | UI Library

</div>

<div align="center">

:globe_with_meridians: [Website](https://svar.dev/svelte/core/) • :bulb: [Getting Started](https://docs.svar.dev/svelte/core/getting_started/) • :eyes: [Demos](https://docs.svar.dev/svelte/core/samples/#/calendar/willow)

</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/@svar-ui/svelte-core.svg)](https://www.npmjs.com/package/@svar-ui/svelte-core)
[![License](https://img.shields.io/github/license/svar-widgets/core)](https://github.com/svar-widgets/core/blob/main/license.txt)
[![npm downloads](https://img.shields.io/npm/dm/@svar-ui/svelte-core.svg)](https://www.npmjs.com/package/@svar-ui/svelte-core)

</div>

**SVAR Svelte Core** library offers a set of 20+ ready-made Svelte UI components: form controls, popups, date and time picker, selects, notifications, and more.
All components are lightweight, responsive, fast-performing, and support TypeScript. 

The library comes in beautifully designed light and dark themes that are easy to customize. 

<div align="center">
	
<img src="https://svar.dev/images/github/github-core.png" alt="SVAR Core - Svelte UI Library" style="width: 752px;">

</div>

</br>
SVAR Core library includes the following components:

-   buttons & form controls,
-   calendar (datepicker),
-   popups,
-   notifications,
-   sliding sidebar,
-   tabs, and more.

Additionally, you can use these SVAR Svelte components to build unified app interfaces:

-   [Menu](https://github.com/svar-widgets/menu) - helps you create basic menu bar, actions or context menu;
-   [Toolbar](https://github.com/svar-widgets/toolbar) - allows you to create button and icon panels with configurable layouts;
-   [Tasklist](https://github.com/svar-widgets/tasklist) - task list component to add, edit, check or delete tasks;
-   [Comments](https://github.com/svar-widgets/comments) - nice-looking comments section;
-   [File uploader](https://github.com/svar-widgets/uploader) - simple file uploader component.

### :hammer_and_wrench: How to Use

To start using components from the **Core** package, simply import the package and include the desired component in your Svelte file:

```svelte
<script>
	import { Button } from "@svar-ui/svelte-core";
</script>

<Button>Click me</Button>
```

See the [getting started guide](https://docs.svar.dev/svelte/core/getting_started/) to quickly set up and begin using SVAR Core components in your Svelte projects.

### :computer: How to Modify

Typically, you don't need to modify the code. However, if you wish to do so, follow these steps:

1. Run `yarn` to install dependencies. Note that this project is a monorepo using `yarn` workspaces, so npm will not work
2. Start the project in development mode with `yarn start`

### :white_check_mark: Run Tests

To run the test:

1. Start the test examples with:
    ```sh
    yarn start:tests
    ```
2. In a separate console, run the end-to-end tests with:
    ```sh
    yarn test:cypress
    ```

### :speech_balloon: Need Help?

[Post an Issue](https://github.com/svar-widgets/core/issues/) or use our [community forum](https://forum.svar.dev).
