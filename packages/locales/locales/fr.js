const lang = "fr-FR";

const calendar = {
	monthFull: [
		"Janvier",
		"Février",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Août",
		"Septembre",
		"Octobre",
		"Novembre",
		"Décembre",
	],
	monthShort: [
		"Jan",
		"Fév",
		"Mar",
		"Avr",
		"Mai",
		"Juin",
		"Juil",
		"Aôu",
		"Sep",
		"Oct",
		"Nov",
		"Déc",
	],
	dayFull: [
		"Dimanche",
		"Lundi",
		"Mardi",
		"Mercredi",
		"Jeudi",
		"Vendredi",
		"Samedi",
	],
	dayShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
	hours: "Heures",
	minutes: "Minutes",
	done: "Fini",
	clear: "Effacer",
	today: "Aujourd'hui",

	weekStart: 1,
	clockFormat: 24,
};

const core = {
	ok: "OK",
	cancel: "Annuler",
	select: "Sélectionner",
	"No data": "Pas de données",
	"Rows per page": "Lignes par page",
	"Total pages": "Nombre total de pages",
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
