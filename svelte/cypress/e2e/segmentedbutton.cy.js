context("colorboard", () => {
	beforeEach(function () {
		cy.visit("index.html#/segmented/willow");
		cy.get(".wx-segmented").first().as("segmented");
		cy.viewport(1300, 900);
	});

	it("switches buttons on click", () => {
		cy.get("@segmented").find("button").eq(1).click();
		cy.get("@segmented")
			.find("button")
			.eq(1)
			.should("have.class", "wx-selected");
		cy.get("@segmented")
			.find("button")
			.eq(0)
			.should("not.have.class", "wx-selected");
	});
});
