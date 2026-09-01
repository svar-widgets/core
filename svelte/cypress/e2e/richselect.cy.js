context("richselect", () => {
	beforeEach(function () {
		cy.visit("index.html#/richselect/willow");
		cy.get(".wx-richselect").first().as("richselect");
		cy.viewport(1300, 900);
	});

	it("opens on click", () => {
		cy.get("@richselect").click();
		cy.get(".wx-popup").should("exist");
		cy.shot("combo-open");
	});

	it("opens on keyboard nav", () => {
		cy.get("@richselect").trigger("keydown", {
			key: "Tab",
			code: "Tab",
			keyCode: 9,
		});
		cy.get("@richselect").trigger("keydown", {
			key: "Enter",
			code: "Enter",
			keyCode: 13,
		});
		cy.get(".wx-popup").should("exist");
		cy.shot("combo-open-keyboard");
	});

	it("closes on clickaway", () => {
		cy.get("@richselect").click();
		cy.get(".wx-popup").should("exist");
		cy.get("body").click();
		cy.get(".wx-popup").should("not.exist");
		cy.shot("combo-close-on-clickaway");
	});

	it("closes on escape", () => {
		cy.get("@richselect").click();
		cy.get(".wx-popup").should("exist");
		cy.get("@richselect").trigger("keydown", {
			key: "Escape",
			code: "Escape",
			keyCode: 27,
		});
		cy.get(".wx-popup").should("not.exist");
		cy.shot("combo-close-on-escape");
	});

	it("selects item on click", () => {
		cy.get("@richselect").click();
		cy.get(".wx-popup").find(".wx-item").first().click();
		cy.get(".wx-popup").should("not.exist");
		cy.get("@richselect")
			.find(".wx-label")
			.should("contain.text", "Berni Mayou");
		cy.shot("combo-select-option-click");
	});

	it("selects item on enter", () => {
		cy.get("@richselect").click();
		cy.get("@richselect").trigger("keydown", {
			key: "ArrowUp",
			code: "ArrowUp",
			keyCode: 38,
		});
		cy.get("@richselect").trigger("keydown", {
			key: "Enter",
			code: "Enter",
			keyCode: 13,
		});
		cy.get(".wx-popup").should("not.exist");
		cy.get("@richselect")
			.find(".wx-label")
			.should("contain.text", "Ned Stark");
		cy.shot("combo-select-option-enter");
	});
});
