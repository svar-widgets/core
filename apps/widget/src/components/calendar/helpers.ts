import type { Component } from "svelte";
import Month from "./Month.svelte";
import Year from "./Year.svelte";
import Duodecade from "./Duodecade.svelte";

export type TCalendarView = "month" | "year" | "duodecade";
export type TCalendarPart = "normal" | "left" | "right" | "both";
// a date, or a range of dates for the range calendar
export type TCalendarValue =
	| Date
	| { start?: Date | null; end?: Date | null }
	| null;
// -1 is the value of the "done" button
export type TPanelValue = Date | null | -1;

export const configs: Record<
	TCalendarView,
	{
		// the views take different props, Panel passes all of them
		component: Component<any>;
		next: (current: Date) => Date;
		prev: (current: Date) => Date;
	}
> = {
	month: {
		component: Month,
		next: nextMonth,
		prev: prevMonth,
	},
	year: {
		component: Year,
		next: nextYear,
		prev: prevYear,
	},
	duodecade: {
		component: Duodecade,
		next: nextDuodecade,
		prev: prevDuodecade,
	},
};

function prevMonth(current: Date) {
	current = new Date(current);
	current.setMonth(current.getMonth() - 1);
	return current;
}
function nextMonth(current: Date) {
	current = new Date(current);
	current.setMonth(current.getMonth() + 1);
	return current;
}
function prevYear(current: Date) {
	current = new Date(current);
	current.setFullYear(current.getFullYear() - 1);
	return current;
}
function nextYear(current: Date) {
	current = new Date(current);
	current.setFullYear(current.getFullYear() + 1);
	return current;
}
function prevDuodecade(current: Date) {
	current = new Date(current);
	current.setFullYear(current.getFullYear() - 10);
	return current;
}
function nextDuodecade(current: Date) {
	current = new Date(current);
	current.setFullYear(current.getFullYear() + 10);
	return current;
}

export function getPartValue(
	value: TCalendarValue | undefined,
	part: TCalendarPart
) {
	let date;
	if (part === "normal") date = value as Date;
	else {
		const { start, end } = value as Exclude<TCalendarValue, Date | null>;
		if (part === "left") date = start;
		else if (part == "right") date = end;
		else date = start ? end : start;
	}

	return date;
}
