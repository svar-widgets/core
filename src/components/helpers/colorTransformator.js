const colorTransformator = {
	_toHex: [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
	],
	toHex(number, length) {
		number = parseInt(number, 10);
		let str = "";
		while (number > 0) {
			str = this._toHex[number % 16] + str;
			number = Math.floor(number / 16);
		}
		while (str.length < length) str = `0${str}`;
		return str;
	},
	rgbToHex(rgb) {
		let arr = [];
		if (typeof rgb === "string")
			rgb.replace(/[\d+.]+/g, v => arr.push(parseFloat(v)));
		else if (Array.isArray(rgb)) arr = rgb;

		//transparent
		if (arr[3] === 0) return "";

		return arr
			.slice(0, 3)
			.map(n => {
				return this.toHex(Math.floor(n), 2);
			})
			.join("");
	},
	hexToDec(hex) {
		return parseInt(hex, 16);
	},
	// only handles the six-digit hex color format
	hexToRgb(hex) {
		hex = hex.charAt(0) === "#" ? hex.slice(1) : hex;
		const rgbPairs = hex.match(/.{1,2}/g);

		let [r, g, b] = rgbPairs;

		r = this.hexToDec(r);
		g = this.hexToDec(g);
		b = this.hexToDec(b);

		return [r, g, b];
	},
	hsvToRgb(h, s, v) {
		let hi, f, p, q, t, r, g, b;
		hi = Math.floor(h / 60) % 6;
		f = h / 60 - hi;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);
		r = 0;
		g = 0;
		b = 0;
		switch (hi) {
			case 0:
				r = v;
				g = t;
				b = p;
				break;
			case 1:
				r = q;
				g = v;
				b = p;
				break;
			case 2:
				r = p;
				g = v;
				b = t;
				break;
			case 3:
				r = p;
				g = q;
				b = v;
				break;
			case 4:
				r = t;
				g = p;
				b = v;
				break;
			case 5:
				r = v;
				g = p;
				b = q;
				break;
			default:
				break;
		}
		r = Math.floor(r * 255);
		g = Math.floor(g * 255);
		b = Math.floor(b * 255);

		return [r, g, b];
	},
	rgbToHsv(r, g, b) {
		let s, h, v;
		r /= 255;
		g /= 255;
		b /= 255;
		let min = Math.min(r, g, b);
		let max = Math.max(r, g, b);
		h = 0;
		s = max === 0 ? 0 : 1 - min / max;
		v = max;
		if (max === min) {
			h = 0;
		} else if (max === r && g >= b) {
			h = (60 * (g - b)) / (max - min) + 0;
		} else if (max === r && g < b) {
			h = (60 * (g - b)) / (max - min) + 360;
		} else if (max === g) {
			h = (60 * (b - r)) / (max - min) + 120;
		} else if (max === b) {
			h = (60 * (r - g)) / (max - min) + 240;
		}

		return [h, s, v];
	},
	hexToHvs(hex) {
		const rgb = this.hexToRgb(hex);
		return this.rgbToHsv(...rgb);
	},
	hvsToHex(h, v, s) {
		const rgb = this.hsvToRgb(h, v, s);
		return "#" + this.rgbToHex(rgb).toUpperCase();
	},
};

export default colorTransformator;
