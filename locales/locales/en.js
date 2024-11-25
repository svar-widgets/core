const lang = "en-US";

const calendar = {
	monthFull: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
	monthShort: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	],
	dayFull: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	],
	dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	hours: "Hours",
	minutes: "Minutes",
	done: "Done",
	clear: "Clear",
	today: "Today",
	am: ["am", "AM"],
	pm: ["pm", "PM"],

	weekStart: 7,
	clockFormat: 24,
};

const core = {
	ok: "OK",
	cancel: "Cancel",
};

const formats = {
	timeFormat: "%H:%i",
	dateFormat: "%m/%d/%Y",
};

const data = {
	core,
	calendar,
	formats,
	lang,
};

export default data;
