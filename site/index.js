import Demo from "./src/Demo.svelte";

new Demo({
	target: document.querySelector("#wx_demo_area") || document.body,
});
