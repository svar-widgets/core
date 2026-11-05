import type { IOption } from "../../types";

// text of an option, taken from the configured field ("label" by default)
export function getOptionText(option: IOption, field: string): string {
	return (option as unknown as Record<string, string>)[field];
}
