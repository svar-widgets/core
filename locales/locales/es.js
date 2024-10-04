const calendar = {
	monthFull: [
		"enero",
		"febrero",
		"marzo",
		"abril",
		"mayo",
		"junio",
		"julio",
		"agosto",
		"septiembre",
		"octubre",
		"noviembre",
		"diciembre",
	],
	monthShort: [
		"ene",
		"feb",
		"mar",
		"abr",
		"may",
		"jun",
		"jul",
		"ago",
		"sep",
		"oct",
		"nov",
		"dic",
	],
	dayFull: [
		"domingo",
		"lunes",
		"martes",
		"miércoles",
		"jueves",
		"viernes",
		"sábado",
	],
	dayShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
	hours: "Horas",
	minutes: "Minutos",
	done: "Listo",
	clear: "Reinicio",
	today: "Hoy",

	weekStart: 1,
	clockFormat: 24,
};

const core = {
	ok: "OK",
	cancel: "Cancelar",
};

const formats = {
	timeFormat: "%H:%i",
	dateFormat: "%d/%m/%Y",
};

const data = {
	core,
	calendar,
	formats,
};

export default data;
