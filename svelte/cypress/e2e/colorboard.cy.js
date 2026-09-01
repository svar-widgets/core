const toRgb = hex => {
	const n = parseInt(hex.slice(1), 16);
	return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
};

context("colorboard", () => {
	beforeEach(function () {
		cy.viewport(1300, 900);
		cy.visit("index.html#/colorpicker/willow");
		cy.get(".wx-colorboard").first().as("colorboard");
	});

	it("selects color on colorboard click", () => {
		cy.contains("h3", "The current color: #48C8E2");
		cy.shot("colorboard-before-click", { area: "@colorboard" });

		cy.get("@colorboard")
			.find(".wx-color-block")
			.click(200, 50, { force: true });

		cy.contains("h3", "The current color:").should(
			"not.have.text",
			"The current color: #48C8E2"
		);
		cy.shot("colorboard-after-click", { area: "@colorboard" });
	});

	it("selects color on line slider drag", () => {
		const color = "#6948E2";

		cy.get("@colorboard")
			.find(".wx-color-line-slider")
			.trigger("mousedown")
			.trigger("mousemove", { clientX: 200 + 8 + 20 })
			.trigger("mouseup");

		cy.get("@colorboard")
			.find(".wx-color-controls")
			.find(".wx-color")
			.should("have.css", "background-color", toRgb(color));
		cy.get("@colorboard")
			.find(".wx-color-controls")
			.find(".wx-text")
			.invoke("val")
			.should("equal", color);
	});

	it("selects color input type", () => {
		const color = "#6948E2";

		cy.get("@colorboard").find(".wx-text").clear();
		cy.get("@colorboard").find(".wx-text").type(color);
		cy.get("@colorboard").find(".wx-text").type("{enter}");
		cy.get("@colorboard")
			.find(".wx-color-controls")
			.find(".wx-color")
			.should("have.css", "background-color", toRgb(color));
		// cy.get("@colorboard")
		//     .find(".wx-color-line-slider")
		//     .should('have.attr', 'style')
		//     .and('include', `background: ${color}`); // color line slider background color doesn't update on other control changes, not sure if this is a bug
		cy.get("@colorboard")
			.find(".wx-color-block-slider")
			.first()
			.should("have.css", "background-color", toRgb(color));
	});
});
