const hexValidation = (str: string) =>
	/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);

export function parseColor(value: string | null | undefined): string | null {
	if (!value) return null;

	value = value.toString();

	if (value.charAt(0) === "#") value = value.slice(1);

	if (hexValidation(value)) {
		if (value.length === 3) {
			value = value
				.slice(0, 3)
				.split("")
				.reduce((a, b) => a + b + b, "");
		}
		return `#${value.toUpperCase()}`;
	}

	return null;
}
