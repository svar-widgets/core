const lang = "de-DE";

const calendar = {
	monthFull: [
		"Januar",
		"Februar",
		"März",
		"April",
		"Mai",
		"Juni",
		"Juli",
		"August",
		"September",
		"Oktober",
		"November",
		"Dezember",
	],
	monthShort: [
		"Jan",
		"Feb",
		"Mrz",
		"Apr",
		"Mai",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Okt",
		"Nov",
		"Dez",
	],
	dayFull: [
		"Sonntag",
		"Montag",
		"Dienstag",
		"Mittwoch",
		"Donnerstag",
		"Freitag",
		"Samstag",
	],
	dayShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	hours: "Stunden",
	minutes: "Minuten",
	done: "Fertig",
	clear: "Entfernen",
	today: "Heute",

	weekStart: 1,
	clockFormat: 24,
};

const core = {
	ok: "OK",
	cancel: "Abbrechen",
};

const formats = {
	timeFormat: "%H:%i",
	dateFormat: "%d.%m.%Y",
};

const data = {
	core,
	calendar,
	formats,
	lang,
};

export default data;
