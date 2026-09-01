context("switch", () => {
	beforeEach(function () {
		cy.visit("index.html#/switch/willow");
		cy.viewport(1300, 900);
	});

	it("toggles switch from checked to unchecked", () => {
		cy.get("label.wx-switch").first().as("switch");

		cy.get("@switch").find("input").should("be.checked");
		cy.shot("switch-before-toggle-checked");

		cy.get("@switch").click();
		cy.get("@switch").find("input").should("not.be.checked");
		cy.shot("switch-after-toggle-unchecked");
	});

	it("toggles switch from unchecked to checked", () => {
		cy.get("label.wx-switch").eq(1).as("switch");

		cy.get("@switch").find("input").should("not.be.checked");
		cy.shot("switch-before-toggle-unchecked");

		cy.get("@switch").click();
		cy.get("@switch").find("input").should("be.checked");
		cy.shot("switch-after-toggle-checked");
	});

	it("maintains disabled state during interaction", () => {
		cy.get("label.wx-switch").eq(2).as("switch");

		cy.get("@switch").find("input").should("be.disabled");
		cy.get("@switch").find("input").should("not.be.checked");
		cy.shot("switch-disabled-unchecked");

		cy.get("@switch").click({ force: true });
		cy.get("@switch").find("input").should("be.disabled");
		cy.get("@switch").find("input").should("not.be.checked");
		cy.shot("switch-disabled-after-click");
	});
});
