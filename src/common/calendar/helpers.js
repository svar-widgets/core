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
	let newCurrent = new Date(current);
	newCurrent.setMonth(current.getMonth() - 1);
	while (current.getMonth() === newCurrent.getMonth()) {
		newCurrent.setDate(newCurrent.getDate() - 1);
	}
	return newCurrent;
}
function nextMonth(current) {
	current = new Date(current);
	current.setDate(1);
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
