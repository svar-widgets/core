<script>
	import Router, { push } from "svelte-spa-router";
	import { wrap } from "svelte-spa-router/wrap";

	import { links } from "../demos/routes.js";
	import { links as localLinks } from "./routes.js";

	import {
		Material,
		Willow,
		WillowDark,
		Globals,
		Locale,
		popupContainer,
	} from "wx-svelte-core";

	const defRoute = links[0][0].replace(/\/:skin$/, "/willow");
	const routes = {
		"/": wrap({
			component: {},
			conditions: () => {
				push(defRoute);
				return false;
			},
		}),
	};

	let skin = $state("willow");
	function onRouteChange(path) {
		const parts = path.split("/");
		skin = parts[2];
	}

	const allLinks = [...localLinks, ...links];
	allLinks.forEach(a => {
		const [path, , component] = a;
		routes[path] = wrap({
			component,
			userData: a,
			conditions: x => {
				onRouteChange(x.location);
				return true;
			},
		});
	});
</script>

<Willow />
<WillowDark />
<Material />

<div class="wx-{skin}-theme content" use:popupContainer>
	<Locale>
		<Globals>
			<Router {routes} />
		</Globals>
	</Locale>
</div>

<style>
	.content {
		height: 100%;
		width: 100%;
		overflow: hidden;
		padding: 0;
		margin: 0;
	}
	.content :global(h4) {
		font-size: 16px;
		font-weight: 300;
		margin-bottom: 12px;
		border-bottom: var(--wx-border);
	}

	.content :global(h3) {
		font-size: 18px;
		margin: 12px 0;
		font-weight: normal;
	}
	.content :global(.demo-box) {
		margin: 20px;
	}
	.content :global(.demo-box + .demo-box) {
		margin-top: 40px;
	}
	.content :global(.demo-code) {
		font-family: monospace;
		line-height: 30px;
	}

	.content :global(.demo-status) {
		height: 30px;
		line-height: 30px;
		background: rgba(0, 0, 0, 0.15);
		padding-left: 10px;
	}
</style>
