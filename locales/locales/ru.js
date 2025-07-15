const lang = "ru-RU";

const calendar = {
	monthFull: [
		"Январь",
		"Февраль",
		"Март",
		"Апрель",
		"Maй",
		"Июнь",
		"Июль",
		"Август",
		"Сентябрь",
		"Oктябрь",
		"Ноябрь",
		"Декабрь",
	],
	monthShort: [
		"Янв",
		"Фев",
		"Maр",
		"Aпр",
		"Maй",
		"Июн",
		"Июл",
		"Aвг",
		"Сен",
		"Окт",
		"Ноя",
		"Дек",
	],
	dayFull: [
		"Воскресенье",
		"Понедельник",
		"Вторник",
		"Среда",
		"Четверг",
		"Пятница",
		"Суббота",
	],
	dayShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
	hours: "Часы",
	minutes: "Минуты",
	done: "Гoтовo",
	clear: "Очистить",
	today: "Сегодня",

	weekStart: 1,
	clockFormat: 24,
};

const core = {
	ok: "OK",
	cancel: "Отмена",
	select: "Выбрать",
	"No data": "Нет данных",
	"Rows per page": "Строк на странице",
	"Total pages": "Всего страниц",
};

const formats = {
	timeFormat: "%H:%i",
	dateFormat: "%d.%m.%Y",
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
