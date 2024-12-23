<script>
	import { onMount } from "svelte";
	import Router, { push } from "svelte-spa-router";
	import { getRoutes, getLinks } from "./helpers";

	let { skin = $bindable(), onnewpage } = $props();
	let page = $state(),
		title;

	$effect(() => {
		if (skin && page) {
			push(`/${page}/${skin}`);
		}
	});

	onMount(() => {
		onnewpage && onnewpage({ page, skin, title });
	});

	function onRouteChange(path) {
		const parts = path.split("/");
		page = parts[1];
		skin = parts[2];

		const tPage = `/${page}/:skin`;
		title = links.find(a => a[0] === tPage)[1];
		onnewpage && onnewpage({ page, skin, title });
	}

	const links = getLinks();
	const routes = getRoutes({}, onRouteChange);
</script>

<Router {routes} />
