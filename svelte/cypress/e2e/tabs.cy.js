context("colorboard", () => {
	beforeEach(function () {
		cy.visit("index.html#/tabs/willow");
		cy.get(".tabbar").first().as("tabbar");
		cy.viewport(1300, 900);
	});

	it("switches tabs on tab click", () => {
		cy.get("@tabbar").find("button").eq(1).click();
		cy.get("@tabbar")
			.find("button")
			.eq(1)
			.should("have.class", "wx-active");
		cy.get("@tabbar")
			.find("button")
			.eq(0)
			.should("not.have.class", "wx-active");

		cy.get("@tabbar").find(".body").should("have.text", "About");
	});
});
