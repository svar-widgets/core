const cases = [
	"/textarea/:skin",
	"/button/:skin",
	"/calendar/:skin",
	"/fullscreen/:skin",
	"/month/:skin",
	"/checkbox/:skin",
	"/colorpicker/:skin",
	"/colorselect/:skin",
	"/combo/:skin",
	"/datepicker/:skin",
	"/daterangepicker/:skin",
	"/field/:skin",
	"/locales/:skin",
	"/messages/:skin",
	"/multicombo/:skin",
	"/range/:skin",
	"/pager/:skin",
	"/popup/:skin",
	"/radio/:skin",
	"/richselect/:skin",
	"/segmented/:skin",
	"/select/:skin",
	"/slider/:skin",
	"/switch/:skin",
	"/tabs/:skin",
	"/inputs/:skin",
	"/timepicker/:skin",
	"/twostate/:skin",
	"/icon/:skin",
	"/sidearea/:skin",
	"/modalarea/:skin",
];
const skins = ["material", "willow", "willow-dark"];
const links = [];

cases.forEach(w => {
	skins.forEach(s => {
		links.push(w.replace(":skin", s));
	});
});

context("Basic functionality", () => {
	it("widget", () => {
		links.forEach(w => {
			cy.visit(`/index.html#${w}`);
			cy.shot(w, { area: ".content" });
		});
	});
});
