import { mount } from "svelte";
import Demos from "./common/Index.svelte";

mount(Demos, {
	target: document.querySelector("#wx_demo_area") || document.body,
});
