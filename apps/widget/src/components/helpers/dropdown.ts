import type { DropdownOptions } from "../../types";

export function toDateDropdown(dropdown?: DropdownOptions) {
	if (!dropdown) dropdown = {};
	if (!dropdown.width) dropdown.width = "unset";
	return dropdown;
}
