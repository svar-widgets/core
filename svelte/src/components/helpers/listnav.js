import { locateID } from "@svar-ui/lib-dom";

export function getListHandlers() {
	let navIndex = null;
	let isVisible = false;

	let list, options, navCallback, selectCallback;
	const init = (l, o, n, c) => {
		list = l;
		options = o;
		navCallback = n;
		selectCallback = c;
	};

	const setNav = index => {
		navIndex = index;
		isVisible = navIndex !== null;
		navCallback(navIndex);
	};
	const navigate = (dir, ev) => {
		const index =
			dir === null
				? null
				: Math.max(0, Math.min(navIndex + dir, options.length - 1));
		if (index === navIndex) return;
		setNav(index);

		if (list) scrollTo(index, ev);
		else requestAnimationFrame(() => scrollTo(index, ev));
	};

	const scrollTo = (navIndex, ev) => {
		if (navIndex !== null && list) {
			const next = list.querySelectorAll(`.wx-list > .wx-item`)[navIndex];
			if (next) {
				next.scrollIntoView({ block: "nearest" });
				if (ev) ev.preventDefault();
			}
		}
	};

	const move = ev => {
		const id = locateID(ev);
		// if we have id:"1", the locateID will return 1 as number
		// so using non-strict comparison
		const index = options.findIndex(a => a.id == id);

		if (index !== navIndex) {
			setNav(index);
		}
	};

	const keydown = (ev, position) => {
		switch (ev.code) {
			case "Enter":
				if (isVisible) selectCallback();
				else setNav(0);
				break;

			case "Space":
				if (!isVisible) setNav(0);
				break;

			case "Escape":
				navCallback((navIndex = null));
				break;

			case "Tab":
				navCallback((navIndex = null));
				break;

			case "ArrowDown":
				navigate(isVisible ? 1 : position || 0, ev);
				break;

			case "ArrowUp":
				navigate(isVisible ? -1 : position || 0, ev);
				break;

			default:
				break;
		}
	};

	return { move, keydown, init, navigate };
}
