import Month from "./Month.svelte";
import Year from "./Year.svelte";
import Duodecade from "./Duodecade.svelte";

export const configs = {
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

function prevMonth(current) {
	current = new Date(current);
	current.setMonth(current.getMonth() - 1);
	return current;
}
function nextMonth(current) {
	current = new Date(current);
	current.setMonth(current.getMonth() + 1);
	return current;
}
function prevYear(current) {
	current = new Date(current);
	current.setFullYear(current.getFullYear() - 1);
	return current;
}
function nextYear(current) {
	current = new Date(current);
	current.setFullYear(current.getFullYear() + 1);
	return current;
}
function prevDuodecade(current) {
	current = new Date(current);
	current.setFullYear(current.getFullYear() - 10);
	return current;
}
function nextDuodecade(current) {
	current = new Date(current);
	current.setFullYear(current.getFullYear() + 10);
	return current;
}

export function getPartValue(value, part) {
	let date;
	if (part === "normal") date = value;
	else {
		const { start, end } = value;
		if (part === "left") date = start;
		else if (part == "right") date = end;
		else date = start ? end : start;
	}

	return date;
}
