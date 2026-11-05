const lang = "es-ES";

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
	select: "Seleccionar",
	"No data": "Sin datos",
	"Rows per page": "Filas por página",
	"Total pages": "Total de páginas",
};

const formats = {
	timeFormat: "%H:%i",
	dateFormat: "%d/%m/%Y",
	monthYearFormat: "%F %Y",
	yearFormat: "%Y",
};

const data = {
	core,
	calendar,
	formats,
	lang,
};

export default data;
