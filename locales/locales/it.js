const lang = "it-IT";

const calendar = {
	monthFull: [
		"gennaio",
		"febbraio",
		"marzo",
		"aprile",
		"maggio",
		"giugno",
		"luglio",
		"agosto",
		"settembre",
		"ottobre",
		"novembre",
		"dicembre",
	],
	monthShort: [
		"gen",
		"feb",
		"mar",
		"apr",
		"mag",
		"giu",
		"lug",
		"ago",
		"set",
		"ott",
		"nov",
		"dic",
	],
	dayFull: [
		"domenica",
		"lunedì",
		"martedì",
		"mercoledì",
		"giovedì",
		"venerdì",
		"sabato",
	],
	dayShort: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
	hours: "Orario",
	minutes: "Minuti",
	done: "Pronto",
	clear: "Pulisci",
	today: "Oggi",

	weekStart: 1,
	clockFormat: 24,
};

const core = {
	ok: "OK",
	cancel: "Annullare",
};

const formats = {
	timeFormat: "%H:%i",
	dateFormat: "%d/%m/%Y",
};

const data = {
	core,
	calendar,
	formats,
	lang,
};

export default data;
