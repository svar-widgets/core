const lang = "zh-CN";

const calendar = {
	monthFull: [
		"一月",
		"二月",
		"三月",
		"四月",
		"五月",
		"六月",
		"七月",
		"八月",
		"九月",
		"十月",
		"十一月",
		"十二月",
	],
	monthShort: [
		"一月",
		"二月",
		"三月",
		"四月",
		"五月",
		"六月",
		"七月",
		"八月",
		"九月",
		"十月",
		"十一月",
		"十二月",
	],
	dayFull: [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六",
	],
	dayShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
	hours: "小时",
	minutes: "分钟",
	done: "完成",
	clear: "清除",
	today: "今天",
	am: ["", ""],
	pm: ["", ""],

	weekStart: 7,
	clockFormat: 24,
};

const core = {
	ok: "确定",
	cancel: "取消",
};

const formats = {
	timeFormat: "%H:%i",
	dateFormat: "%Y-%m-%d",
};

const data = {
	core,
	calendar,
	formats,
	lang,
};

export default data;
