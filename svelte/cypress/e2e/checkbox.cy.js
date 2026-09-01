context("checkbox", () => {
	beforeEach(function () {
		cy.visit("index.html#/checkbox/willow");
		cy.viewport(1300, 900);
	});

	it("toggles checkbox from checked to unchecked", () => {
		cy.get(".wx-checkbox").first().as("checkbox");

		cy.get("@checkbox").find("input").should("be.checked");
		cy.shot("checkbox-before-toggle-checked");

		cy.get("@checkbox").click();
		cy.get("@checkbox").find("input").should("not.be.checked");
		cy.shot("checkbox-after-toggle-unchecked");
	});

	it("toggles checkbox from unchecked to checked", () => {
		cy.get(".wx-checkbox").eq(1).as("checkbox");

		cy.get("@checkbox").find("input").should("not.be.checked");
		cy.shot("checkbox-before-toggle-unchecked");

		cy.get("@checkbox").click();
		cy.get("@checkbox").find("input").should("be.checked");
		cy.shot("checkbox-after-toggle-checked");
	});

	it("maintains disabled unchecked state during interaction", () => {
		cy.contains(".wx-checkbox", "Default").as("checkbox");

		cy.get("@checkbox").find("input").should("be.disabled");
		cy.get("@checkbox").find("input").should("not.be.checked");
		cy.shot("checkbox-disabled-unchecked");

		cy.get("@checkbox").click({ force: true });
		cy.get("@checkbox").find("input").should("be.disabled");
		cy.get("@checkbox").find("input").should("not.be.checked");
		cy.shot("checkbox-disabled-unchecked-after-click");
	});

	it("maintains disabled checked state during interaction", () => {
		cy.contains(".wx-checkbox", "Checked").as("checkbox");

		cy.get("@checkbox").find("input").should("be.disabled");
		cy.get("@checkbox").find("input").should("be.checked");
		cy.shot("checkbox-disabled-checked");

		cy.get("@checkbox").click({ force: true });
		cy.get("@checkbox").find("input").should("be.disabled");
		cy.get("@checkbox").find("input").should("be.checked");
		cy.shot("checkbox-disabled-checked-after-click");
	});

	it("displays checkbox group default layout", () => {
		cy.get(".wx-checkboxgroup").first().as("group");

		cy.get("@group")
			.find("input[type='checkbox']")
			.should("have.length", 5);
		cy.get("@group")
			.find("input[type='checkbox']")
			.eq(0)
			.should("be.checked");
		cy.get("@group")
			.find("input[type='checkbox']")
			.eq(1)
			.should("be.checked");
		cy.shot("checkbox-group-default-initial");

		cy.get("@group").find(".wx-checkbox").eq(2).click();
		cy.get("@group")
			.find("input[type='checkbox']")
			.eq(2)
			.should("be.checked");
		cy.shot("checkbox-group-default-after-select");
	});

	it("displays checkbox group inline layout", () => {
		cy.get(".wx-checkboxgroup.wx-inline").as("group");

		cy.get("@group")
			.find("input[type='checkbox']")
			.should("have.length", 5);
		cy.get("@group")
			.find("input[type='checkbox']")
			.eq(1)
			.should("be.checked");
		cy.get("@group")
			.find("input[type='checkbox']")
			.eq(2)
			.should("be.checked");
		cy.shot("checkbox-group-inline-initial");

		cy.get("@group").find(".wx-checkbox").eq(0).click();
		cy.get("@group")
			.find("input[type='checkbox']")
			.eq(0)
			.should("be.checked");
		cy.shot("checkbox-group-inline-after-select");
	});

	it("displays checkbox group grid layout", () => {
		cy.get(".wx-checkboxgroup.wx-grid").as("group");

		cy.get("@group")
			.find("input[type='checkbox']")
			.should("have.length", 5);
		cy.get("@group")
			.find("input[type='checkbox']")
			.eq(2)
			.should("be.checked");
		cy.get("@group")
			.find("input[type='checkbox']")
			.eq(3)
			.should("be.checked");
		cy.shot("checkbox-group-grid-initial");

		cy.get("@group").find(".wx-checkbox").eq(0).click();
		cy.get("@group")
			.find("input[type='checkbox']")
			.eq(0)
			.should("be.checked");
		cy.shot("checkbox-group-grid-after-select");
	});
});
