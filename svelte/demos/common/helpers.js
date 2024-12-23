import { push } from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import { links as raw } from "../routes";

const routes = {
	"/": wrap({
		component: {},
		conditions: () => {
			push("/base/willow");
			return false;
		},
	}),
};

function getRoutes(skinSettings, cb) {
	raw.forEach(
		a =>
			(routes[a[0]] = wrap({
				component: a[2],
				userData: a,
				props: { ...skinSettings },
				conditions: x => {
					cb(x.location);
					return true;
				},
			}))
	);

	return routes;
}

function getLinks() {
	return raw;
}

export { push, getRoutes, getLinks };
