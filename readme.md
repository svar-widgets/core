<div align="center">
	
# SVAR Svelte Core | UI Library

</div>

<div align="center">

:globe_with_meridians: [Website](https://svar.dev/svelte/core/) • :bulb: [Getting Started](https://docs.svar.dev/svelte/core/getting_started/) • :eyes: [Demos](https://docs.svar.dev/svelte/core/samples/#/calendar/willow)

</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/wx-svelte-core.svg)](https://www.npmjs.com/package/wx-svelte-core)
[![License](https://img.shields.io/github/license/svar-widgets/core)](https://github.com/svar-widgets/core/blob/main/license.txt)
[![npm downloads](https://img.shields.io/npm/dm/wx-svelte-core.svg)](https://www.npmjs.com/package/wx-svelte-core)

</div>

SVAR Core library offers a set of 20+ ready-made Svelte UI components: form controls, popups, date and time picker, toast notifications, and more.
All components are lightweight, responsive, fast-performing, and available in light and dark skins.

<img src="https://cdn.svar.dev/public/core-ui-dark.jpg" alt="SVAR Core Library - Dark Skin" style="width: 600px;">

In addition to the Core library, you can use the following SVAR components to build unified app UIs:
- [Menu](https://github.com/svar-widgets/menu)
- [Toolbar](https://github.com/svar-widgets/toolbar)
- [File uploader](https://github.com/svar-widgets/uploader)

### Versions for Svelte 4 and 5

There are two versions of the library: 
- version **1.x** was designed to work with Svelte 4
- version **2.x** is created for Svelte 5 (please note that this version is in beta and may contain some instabilities)

To use SVAR Core v.2.0 beta for Svelte 5, install it as follows:

```
npm install wx-svelte-core
```

To use SVAR Core for Svelte 4:

```
npm install wx-svelte-core@1.3.0
```

### :hammer_and_wrench: How to Use

To use any of the Core components, simply import the package and include the desired component in your Svelte file:

```svelte
<script>
	import { Button } from "wx-svelte-core";
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
