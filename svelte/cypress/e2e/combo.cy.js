context("combo", () => {
	beforeEach(function () {
		cy.visit("index.html#/combo/willow");
		cy.get(".wx-combo").first().as("combo");
		cy.viewport(1300, 900);
	});

	it("opens on click", () => {
		cy.get("@combo").click();
		cy.get(".wx-popup").should("exist");
		cy.shot("combo-open");
	});

	it("opens on keyboard nav", () => {
		cy.get("@combo").trigger("keydown", {
			key: "Tab",
			code: "Tab",
			keyCode: 9,
		});
		cy.get("@combo").trigger("keydown", {
			key: "Enter",
			code: "Enter",
			keyCode: 13,
		});
		cy.get(".wx-popup").should("exist");
		cy.shot("combo-open-keyboard");
	});

	it("closes on clickaway", () => {
		cy.get("@combo").click();
		cy.get(".wx-popup").should("exist");
		cy.get("body").click();
		cy.get(".wx-popup").should("not.exist");
		cy.shot("combo-close-on-clickaway");
	});

	it("closes on escape", () => {
		cy.get("@combo").click();
		cy.get(".wx-popup").should("exist");
		cy.get("@combo").trigger("keydown", {
			key: "Escape",
			code: "Escape",
			keyCode: 27,
		});
		cy.get(".wx-popup").should("not.exist");
		cy.shot("combo-close-on-escape");
	});

	it("selects item on click", () => {
		cy.get("@combo").click();
		cy.get(".wx-popup").find(".wx-item").first().click();
		cy.get(".wx-popup").should("not.exist");
		cy.get("@combo")
			.find("input")
			.invoke("val")
			.should("equal", "Berni Mayou");
		cy.shot("combo-select-option-click");
	});

	it("selects item on enter", () => {
		cy.get("@combo").click();
		cy.get("@combo").trigger("keydown", {
			key: "ArrowUp",
			code: "ArrowUp",
			keyCode: 38,
		});
		cy.get("@combo").trigger("keydown", {
			key: "Enter",
			code: "Enter",
			keyCode: 13,
		});
		cy.get(".wx-popup").should("not.exist");
		cy.get("@combo")
			.find("input")
			.invoke("val")
			.should("equal", "Ned Stark");
		cy.shot("combo-select-option-enter");
	});

	it("narrows options with search", () => {
		cy.get("@combo").click();
		cy.get("@combo").find("input").clear();
		cy.get("@combo").type("J");
		cy.get(".wx-popup").find(".wx-list").as("list");
		cy.get("@list").children().should("have.length", 2);
		cy.get("@list").children().first().should("contain.text", "Jon Snow");
		cy.shot("combo-search");
	});
});
