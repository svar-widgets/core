const lang = "ja-JP";

const calendar = {
	monthFull: [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月",
	],
	monthShort: [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月",
	],
	dayFull: [
		"日曜日",
		"月曜日",
		"火曜日",
		"水曜日",
		"木曜日",
		"金曜日",
		"土曜日",
	],
	dayShort: ["日", "月", "火", "水", "木", "金", "土"],
	hours: "営業時間",
	minutes: "分",
	done: "レディー",
	clear: "削除する",
	today: "今日",

	weekStart: 1,
	clockFormat: 24,
};

const core = {
	ok: "OK",
	cancel: "取り消す",
	select: "選択",
	"No data": "データが見つかりませんでした",
	"Rows per page": "1ページあたりの行数",
	"Total pages": "総ページ数",
};

const formats = {
	timeFormat: "%H:%i",
	dateFormat: "%Y年%m月%d日",
	monthYearFormat: "%m月%Y年",
	yearFormat: "%Y年",
};

const data = {
	core,
	calendar,
	formats,
	lang,
};

export default data;
