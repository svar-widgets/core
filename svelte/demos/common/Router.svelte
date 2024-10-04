<script>
	import { createEventDispatcher, onMount } from "svelte";
	import Router, { push } from "svelte-spa-router";
	import { getRoutes, getLinks } from "./helpers";

	const dispatch = createEventDispatcher();
	export let skin;
	let page, title;

	$: {
		if (skin && page) {
			push(`/${page}/${skin}`);
		}
	}
	onMount(() => {
		dispatch("newpage", { page, skin, title });
	});

	function onRouteChange(path) {
		const parts = path.split("/");
		page = parts[1];
		skin = parts[2];

		const tPage = `/${page}/:skin`;
		title = links.find(a => a[0] === tPage)[1];
		dispatch("newpage", { page, skin, title });
	}

	const links = getLinks();
	const routes = getRoutes({}, onRouteChange);
</script>

<Router {routes}>
	<slot />
</Router>
