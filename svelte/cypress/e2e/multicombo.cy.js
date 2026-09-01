context("combo", () => {
	beforeEach(function () {
		cy.visit("index.html#/multicombo/willow");
		cy.get(".wx-multicombo").first().as("multicombo");
		cy.viewport(1300, 900);
	});

	it("opens on click", () => {
		cy.get("@multicombo").click();
		cy.get(".wx-popup").should("exist");
		cy.shot("combo-open");
	});

	it("opens on keyboard nav", () => {
		cy.get("@multicombo").trigger("keydown", {
			key: "Tab",
			code: "Tab",
			keyCode: 9,
		});
		cy.get("@multicombo").trigger("keydown", {
			key: "Enter",
			code: "Enter",
			keyCode: 13,
		});
		cy.get(".wx-popup").should("exist");
		cy.shot("combo-open-keyboard");
	});

	it("closes on clickaway", () => {
		cy.get("@multicombo").click();
		cy.get(".wx-popup").should("exist");
		cy.get("body").click();
		cy.get(".wx-popup").should("not.exist");
		cy.shot("combo-close-on-clickaway");
	});

	it("closes on escape", () => {
		cy.get("@multicombo").click();
		cy.get(".wx-popup").should("exist");
		cy.get("@multicombo").trigger("keydown", {
			key: "Escape",
			code: "Escape",
			keyCode: 27,
		});
		cy.get(".wx-popup").should("not.exist");
		cy.shot("combo-close-on-escape");
	});

	it("selects item on click", () => {
		cy.get("@multicombo").click();
		cy.get(".wx-popup").find(".wx-item").first().click();
		cy.get("@multicombo")
			.find(".wx-tag")
			.first()
			.should("contain.text", "Berni Mayou");
		cy.shot("combo-select-option-click");
	});

	it("selects multiple items on click", () => {
		cy.get("@multicombo").click();
		cy.get(".wx-popup").find(".wx-item").first().click();
		cy.get(".wx-popup").find(".wx-item").last().click();
		cy.get("@multicombo")
			.find(".wx-tag")
			.first()
			.should("contain.text", "Berni Mayou");
		cy.get("@multicombo")
			.find(".wx-tag")
			.last()
			.should("contain.text", "Jason");
		cy.get("@multicombo");
	});

	it("selects item on enter", () => {
		cy.get("@multicombo").click();
		cy.get("@multicombo").trigger("keydown", {
			key: "ArrowUp",
			code: "ArrowUp",
			keyCode: 38,
		});
		cy.get("@multicombo").trigger("keydown", {
			key: "Enter",
			code: "Enter",
			keyCode: 13,
		});
		cy.get("@multicombo")
			.find(".wx-tag")
			.first()
			.should("contain.text", "Ned Stark");
		cy.shot("combo-select-option-enter");
	});

	it("deselects item on selected item click", () => {
		cy.get("@multicombo").click();
		cy.get(".wx-popup").find(".wx-item").first().click();

		cy.get(".wx-popup").find(".wx-item").first().click();
		cy.get("@multicombo").find("input").invoke("val").should("equal", "");
	});

	it("deselects item on cancel selection button click", () => {
		cy.get("@multicombo").click();
		cy.get("@multicombo")
			.find(".wx-tag")
			.first()
			.contains("Lord Varys")
			.as("tag");
		cy.get("@tag").find(".wxi-close").click();
		cy.get("@multicombo")
			.find(".wx-tags")
			.children()
			.should("have.length", 0);
	});

	it("narrows options with search", () => {
		cy.get("@multicombo").click();
		cy.get("@multicombo").find("input").clear();
		cy.get("@multicombo").type("J");
		cy.get(".wx-popup").find(".wx-list").as("list");
		cy.get("@list").children().should("have.length", 2);
		cy.get("@list").children().first().should("contain.text", "Jon Snow");
		cy.shot("combo-search");
	});
});
