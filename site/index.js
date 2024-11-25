import Demo from "./src/Demo.svelte";
import { mount } from "svelte";

mount(Demo, {
	target: document.querySelector("#wx_demo_area") || document.body,
});
