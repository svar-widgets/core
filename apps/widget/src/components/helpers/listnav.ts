import { locateID } from "@svar-ui/lib-dom";
import type { IOption } from "../../types";

export type TNavigate = (dir: number | null, ev?: KeyboardEvent) => void;
export type TKeydown = (ev: KeyboardEvent, position?: number) => void;
export type TMove = (ev: MouseEvent) => void;

export function getListHandlers() {
	let navIndex: number | null = null;
	let isVisible = false;
	let virtualized = false;
	let list: HTMLElement | undefined,
		options: IOption[],
		navCallback: (index: number | null) => void,
		selectCallback: () => void;
	const init = (
		l: HTMLElement | undefined,
		o: IOption[],
		n: (index: number | null) => void,
		c: () => void,
		v: boolean
	) => {
		list = l;
		options = o;
		navCallback = n;
		selectCallback = c;
		virtualized = v;
	};

	const setNav = (index: number | null) => {
		navIndex = index;
		isVisible = navIndex !== null;
		navCallback(navIndex);
	};
	const navigate: TNavigate = (dir, ev) => {
		const index =
			dir === null
				? null
				: Math.max(0, Math.min(navIndex! + dir, options.length - 1));
		if (index === navIndex) return;
		setNav(index);

		if (list) scrollTo(index, ev);
		else requestAnimationFrame(() => scrollTo(index, ev));
	};

	const scrollTo = (navIndex: number | null, ev?: KeyboardEvent) => {
		if (!virtualized && navIndex !== null && list) {
			const next = list.querySelectorAll(`.wx-list > .wx-item`)[navIndex];
			if (next) {
				next.scrollIntoView({ block: "nearest" });
				if (ev) ev.preventDefault();
			}
		}
	};

	const move: TMove = ev => {
		const id = locateID(ev);
		const index = options.findIndex(a => a.id === id);

		if (index !== navIndex) {
			setNav(index);
		}
	};

	const keydown: TKeydown = (ev, position) => {
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
