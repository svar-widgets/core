const formatMonth = monthRaw => {
	return monthRaw[0].toUpperCase() + monthRaw.slice(1);
};

const getFormattedDate = date => {
	return {
		day: date.getDate(),
		month: formatMonth(date.toLocaleString("en-us", { month: "long" })),
		year: date.getFullYear(),
	};
};

const testDate = new Date(2022, 2, 18);

context("calendar", () => {
	beforeEach(function () {
		cy.visit("index.html#/calendar/willow");
		cy.get(".wx-calendar").first().as("calendar");
		cy.get("@calendar").find(".wx-header .wx-label").as("header-label");
		cy.get("@calendar")
			.find(".wx-header .wx-pager.wxi-angle-left")
			.as("arrow-left");
		cy.get("@calendar")
			.find(".wx-header .wx-pager.wxi-angle-right")
			.as("arrow-right");

		cy.viewport(1300, 900);
	});

	it("selects today date on button click", () => {
		const { day, month, year } = getFormattedDate(new Date());
		cy.get("@calendar").contains("button", "Today").click();
		cy.get("@header-label").should("contain.text", `${month} ${year}`);
		cy.get("@calendar")
			.find(".wx-day.wx-selected")
			.should("contain.text", day);
	});

	it("clear button works correctly", () => {
		cy.get("@calendar").contains("button", "Clear").click();
		cy.get("@calendar")
			.find(".wx-day")
			.contains("div", testDate.getDate())
			.should("not.have.class", "wx-selected");

		cy.shot("calendar-clear");
	});

	it("selects day", () => {
		cy.get("@calendar").find(".wx-day").contains("div", "1").click();
		cy.get("@calendar")
			.find(".wx-day")
			.contains("div", "1")
			.click()
			.should("have.class", "wx-selected");

		cy.shot("calendar-select-day");
	});

	it("switches months on arrow button click", () => {
		const previousMonthDate = getFormattedDate(
			new Date(
				testDate.getFullYear(),
				testDate.getMonth() - 1,
				testDate.getDate()
			)
		);

		const nextMonthDate = getFormattedDate(
			new Date(
				testDate.getFullYear(),
				testDate.getMonth() + 1,
				testDate.getDate()
			)
		);

		cy.get("@arrow-left").click();

		cy.get("@header-label").should(
			"contain.text",
			`${previousMonthDate.month} ${previousMonthDate.year}`
		);
		cy.shot("calendar-switch-month-previous");

		cy.get("@arrow-right").click().click();
		cy.get("@header-label").should(
			"contain.text",
			`${nextMonthDate.month} ${nextMonthDate.year}`
		);
		cy.shot("calendar-switch-month-next");
	});

	it("selects month", () => {
		const nextMonthDate = new Date(
			testDate.getFullYear(),
			testDate.getMonth() + 1,
			testDate.getDate()
		);
		const nextMonthDateFormatted = getFormattedDate(nextMonthDate);
		cy.get("@header-label").click();
		cy.get("@header-label").should("contain.text", testDate.getFullYear());
		cy.get("@calendar")
			.find(".wx-month.wx-current")
			.should("have.attr", "data-id", testDate.getMonth());
		cy.get("@calendar")
			.find(".wx-month.wx-current")
			.should(
				"contain.text",
				getFormattedDate(testDate).month.slice(0, 3)
			);
		cy.shot("calendar-select-month-view");
		cy.get("@calendar")
			.find(`[data-id="${nextMonthDate.getMonth()}"]`)
			.click();
		cy.get("@header-label").should(
			"contain.text",
			`${nextMonthDateFormatted.month} ${nextMonthDateFormatted.year}`
		);
		cy.shot("calendar-month-selected");
	});

	it("switches years on arrow button click", () => {
		cy.get("@header-label").click();
		cy.get("@header-label").should("contain.text", testDate.getFullYear());
		cy.get("@arrow-left").click();
		cy.get("@header-label").should(
			"contain.text",
			testDate.getFullYear() - 1
		);
		cy.shot("calendar-switch-year-previous");
		cy.get("@arrow-right").click().click();
		cy.get("@header-label").should(
			"contain.text",
			testDate.getFullYear() + 1
		);
		cy.shot("calendar-switch-year-next");
	});

	it("selects year", () => {
		cy.get("@header-label").click();
		cy.get("@header-label").click();
		cy.get("@header-label").should("contain.text", "2013 - 2024");
		cy.shot("calendar-select-year-selection");
		cy.get("@arrow-left").click();
		cy.get("@header-label").should("contain.text", "2002 - 2013");
		cy.shot("calendar-select-year-previous");
		cy.get("@calendar").find('[data-id="2007"]').click();
		cy.shot("calendar-year-selected");
		cy.get("@header-label").should("contain.text", "2007");
		cy.get("@calendar")
			.find(".wx-month.wx-current")
			.should("have.attr", "data-id", testDate.getMonth());
	});

	it("done button returns to month view", () => {
		const testDateFormatted = getFormattedDate(testDate);
		cy.get("@header-label").click();
		cy.get("@calendar").contains("button", "Done").click();
		cy.get("@header-label").should(
			"contain.text",
			`${testDateFormatted.month} ${testDateFormatted.year}`
		);
		cy.get("@calendar")
			.find(".wx-day")
			.contains("div", testDate.getDate())
			.should("have.class", "wx-selected");
		cy.shot("calendar-done");
	});
});
