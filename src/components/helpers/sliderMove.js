export function sliderMove(node, config) {
	const slider = node.firstChild;
	const { moveBlockSlider, moveLineSlider } = config || {};

	function down(ev) {
		move(ev);

		slider.focus();

		window.addEventListener("mousemove", move);
		window.addEventListener("mouseup", up);
	}

	function move(ev) {
		let x, y, dx, dy;

		const coords = node.getBoundingClientRect();
		x = coords.left;
		y = coords.top;

		dx = ev.clientX - x;
		dy = ev.clientY - y;

		if (moveBlockSlider) config.moveBlockSlider(dx, dy);
		if (moveLineSlider) config.moveLineSlider(dx);
	}

	function up() {
		slider.blur();

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
