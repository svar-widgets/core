const getFormattedDate = date => {
	return date.toLocaleDateString(undefined, {
		month: "2-digit",
		day: "2-digit",
		year: "numeric",
	});
};

const defaultDateStart = new Date(2020, 1, 1);
const defaultDateEnd = new Date(2021, 3, 3);

function testClearButton({ dateInput }) {
	cy.get(dateInput).click();
	cy.get(".wx-popup").should("exist");
	cy.get(".wx-popup").contains("button", "Clear").click();
	cy.get(".wx-popup").should("not.exist");
	cy.get(dateInput).should("be.empty");
}

function testTodayButton({ dateInput }) {
	const today = new Date();
	const todayFormatted = getFormattedDate(today);
	cy.get(dateInput).click();
	cy.get(".wx-popup").should("exist");
	cy.get(".wx-popup").contains("button", "Today").click();
	cy.get(".wx-popup").should("not.exist");
	cy.get(dateInput)
		.invoke("val")
		.should("equal", `${todayFormatted} - ${todayFormatted}`);

	cy.get(dateInput).click();
	cy.get(".wx-popup")
		.find(".wx-day.wx-selected")
		.should("contain.text", today.getDate());
}

function testRangeSelection({ dateInput, withDoneButton }) {
	const testDateStart = new Date(2020, 1, 10);
	const testDateEnd = new Date(2020, 3, 10);
	const testDateStartFormatted = getFormattedDate(testDateStart);
	const testDateEndFormatted = getFormattedDate(testDateEnd);

	cy.get(dateInput).click();
	cy.get(".wx-popup").should("exist");
	cy.get(".wx-popup")
		.find(".wx-half")
		.first()
		.contains("div.wx-day", testDateStart.getDate())
		.click();
	cy.get(".wx-popup").find(".wx-pager.wxi-angle-right").click();
	cy.get(".wx-popup")
		.find(".wx-half")
		.last()
		.contains("div.wx-day", testDateEnd.getDate())
		.click();
	if (withDoneButton) {
		cy.get(".wx-popup").contains("button", "Done").click();
	}
	cy.get(".wx-popup").should("not.exist");
	cy.get(dateInput)
		.invoke("val")
		.should("equal", `${testDateStartFormatted} - ${testDateEndFormatted}`);
	cy.get(dateInput).click();
	cy.get(".wx-popup").should("exist");
	cy.get(".wx-popup").find(".wx-day.wx-selected");
}

context("daterange", () => {
	beforeEach(function () {
		cy.visit("index.html#/daterangepicker/willow");
		cy.get(".wx-daterangepicker").first().as("daterangepicker");
		cy.get("@daterangepicker").find("input").as("date-input");

		cy.get(".wx-daterangepicker input:not([readonly]):not([disabled])")
			.first()
			.closest(".wx-daterangepicker")
			.should("exist")
			.as("daterangepicker-editable");
		cy.get("@daterangepicker-editable")
			.find("input")
			.as("date-input-editable");
		cy.viewport(1300, 900);
	});

	it("clears daterange on button click", () => {
		testClearButton({
			dateInput: "@date-input",
		});
		cy.shot("daterange-clear");
	});

	it("today button works", () => {
		testTodayButton({
			dateInput: "@date-input",
		});
		cy.shot("daterange-today");
	});

	it("selects range correctly", () => {
		testRangeSelection({
			dateInput: "@date-input",
		});
		cy.shot("daterange-selection");
	});

	it("selects range correctly with done button", () => {
		cy.contains("label", "DateRangePicker with the Done button")
			.closest(".wx-field")
			.find(".wx-daterangepicker")
			.as("daterangepicker-done");
		cy.get("@daterangepicker-done").find("input").as("date-input-done");
		testRangeSelection({
			dateInput: "@date-input-done",
			withDoneButton: true,
		});
		cy.shot("daterange-selection-with-done-button");
	});

	it("updates calendar view on text edit in editable variant", () => {
		const testDateStart = new Date(2020, 1, 10);
		const testDateEnd = new Date(2021, 3, 10);
		const testDateStartFormatted = getFormattedDate(testDateStart);
		const testDateEndFormatted = getFormattedDate(testDateEnd);

		cy.get("@date-input-editable").type(
			`${testDateStartFormatted} - ${testDateEndFormatted}`
		);
		cy.get("@date-input-editable").type("{enter}");
		cy.get("@date-input-editable").click();
		cy.shot("edit-test");
	});

	it("clears daterange on button click in editable variant", () => {
		testClearButton({
			dateInput: "@date-input-editable",
		});
		cy.shot("daterange-editable-clear");
	});

	it("today button works in editable variant", () => {
		testTodayButton({
			dateInput: "@date-input-editable",
		});
		cy.shot("daterange-editable-today");
	});

	it("selects range correctly in editable variant", () => {
		testRangeSelection({
			dateInput: "@date-input-editable",
		});
		cy.shot("daterange-selection-editable");
	});
});
