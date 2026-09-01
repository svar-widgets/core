context("slider", () => {
	beforeEach(function () {
		cy.visit("index.html#/slider/willow");
		cy.viewport(1300, 900);
	});

	it("updates value", () => {
		cy.get(".wx-slider>div>input").first().as("slider");

		cy.get("@slider").should("have.value", "50");
		cy.get("@slider").invoke("val", 75).trigger("input");
		cy.get("@slider").should("have.value", "75");
		cy.get(".wx-slider>div>label")
			.first()
			.should("contain", "Progress: 75%");
		cy.shot("slider-drag-update");
	});

	it("updates from input event", () => {
		cy.get(".wx-slider>div>input").eq(1).as("slider");

		cy.get("@slider").should("have.value", "50");
		cy.get("@slider").invoke("val", 75).trigger("input");
		cy.get("@slider").should("have.value", "75");
		cy.get(".wx-slider>div>label").eq(1).should("contain", "Progress: 75%");
		cy.shot("slider-drag-update");
	});

	it("updates from change event", () => {
		cy.get(".wx-slider>div>input").eq(2).as("slider");

		cy.get("@slider").should("have.value", "50");
		cy.get("@slider").invoke("val", 75).trigger("change");
		cy.get("@slider").should("have.value", "75");
		cy.get(".wx-slider>div>label").eq(2).should("contain", "Progress: 75%");
		cy.shot("slider-drag-update");
	});

	it("displays disabled slider", () => {
		cy.get(".wx-slider>div>input").eq(3).as("slider");
		cy.get("@slider").should("have.attr", "disabled");

		cy.shot("slider-disabled");
	});

	it("displays slider with unset value", () => {
		cy.get(".wx-slider>div>input").last().should("have.value", "0");
		cy.shot("slider-unset-value");
	});

	it("respects min and max values", () => {
		cy.get(".wx-slider>div>input").first().as("slider");

		cy.get("@slider").should("have.attr", "min", "0");
		cy.get("@slider").should("have.attr", "max", "100");
		cy.get("@slider").invoke("val", 0).trigger("input");
		cy.get("@slider").should("have.value", "0");
		cy.shot("slider-min-value");

		cy.get("@slider").invoke("val", 101).trigger("input");
		cy.get("@slider").should("have.value", "100");
		cy.shot("slider-max-value");
	});

	it("maintains disabled state during interaction", () => {
		cy.get(".wx-slider>div>input").eq(3).as("slider");

		cy.get("@slider").click({ force: true });
		cy.get("@slider").should("have.value", "20");
		cy.shot("slider-disabled-interaction");
	});
});
