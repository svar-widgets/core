const lang = "pt-PT";

const calendar = {
	monthFull: [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	],
	monthShort: [
		"Jan",
		"Fev",
		"Mar",
		"Abr",
		"Mai",
		"Jun",
		"Jul",
		"Ago",
		"Set",
		"Out",
		"Nov",
		"Dez",
	],
	dayFull: [
		"Domingo",
		"Segunda-Feira",
		"Terça-Feira",
		"Quarta-Feira",
		"Quinta-Feira",
		"Sexta-Feira",
		"Sábado",
	],
	dayShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
	hours: "Horas",
	minutes: "Minutos",
	done: "Feito",
	clear: "Limpar",
	today: "Hoje",

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
	lang,
};

export default data;
