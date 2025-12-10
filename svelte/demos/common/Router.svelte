<script>
	import { onMount } from "svelte";
	import Router, { push } from "svelte-spa-router";
	import { getRoutes, getLinks } from "./helpers";

	let { skin = $bindable(), onnewpage, productTag } = $props();
	let page = $state(),
		title,
		link,
		name;
	const baseLink =
		"https://github.com/svar-widgets/" +
		productTag +
		"/blob/main/svelte/demos/cases/";

	$effect(() => {
		if (skin && page) {
			push(`/${page}/${skin}`);
		}
	});

	onMount(() => {
		onnewpage && onnewpage({ page, skin, title, link });
	});

	function onRouteChange(path) {
		const parts = path.split("/");
		page = parts[1];
		skin = parts[2];

		const tPage = `/${page}/:skin`;
		const matched = links.find(a => a[0] === tPage);
		title = matched?.[1] ?? "";
		name = matched?.[3] ?? "";
		link = `${baseLink}${name.replace(/\s+/g, "")}.svelte`;

		onnewpage && onnewpage({ page, skin, title, link });
	}

	const links = getLinks();
	const routes = getRoutes({}, onRouteChange);
</script>

<Router {routes} />
