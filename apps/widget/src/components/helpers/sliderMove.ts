export interface ISliderMoveConfig {
	moveBlockSlider?: (dx: number, dy: number) => void;
	moveLineSlider?: (dx: number) => void;
}

export function sliderMove(node: HTMLElement, config?: ISliderMoveConfig) {
	const slider = node.firstChild as HTMLElement;
	const { moveBlockSlider, moveLineSlider } = config || {};

	function down(ev: MouseEvent) {
		move(ev);

		slider.focus();

		window.addEventListener("mousemove", move);
		window.addEventListener("mouseup", up);
	}

	function move(ev: MouseEvent) {
		let x, y, dx, dy;

		const coords = node.getBoundingClientRect();
		x = coords.left;
		y = coords.top;

		dx = ev.clientX - x;
		dy = ev.clientY - y;

		if (moveBlockSlider) moveBlockSlider(dx, dy);
		if (moveLineSlider) moveLineSlider(dx);
	}

	function up() {
		window.removeEventListener("mousemove", move);
		window.removeEventListener("mouseup", up);
	}

	node.addEventListener("mousedown", down);

	return {
		destroy() {
			node.removeEventListener("mousedown", down);
		},
	};
}
