import { mount } from "svelte";
import Demos from "./common/Index.svelte";
import { Willow, WillowDark } from "../src/";
import { WillowIcon, WillowDarkIcon } from "./assets/icons/index";

mount(Demos, {
	target: document.querySelector("#wx_demo_area") || document.body,
	props: {
		publicName: "Core",
		productTag: "core",
		productLink: "core",
		skins: [
			{
				id: "willow",
				label: "Willow",
				component: Willow,
				icon: WillowIcon,
			},
			{
				id: "willow-dark",
				label: "Dark",
				component: WillowDark,
				icon: WillowDarkIcon,
			},
		],
	},
});
