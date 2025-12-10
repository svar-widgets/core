context("Fullscreen", () => {
	beforeEach(() => {
		cy.visit("index.html#/fullscreen/willow", {
			onBeforeLoad(win) {
				cy.stub(win.document, "exitFullscreen").as("exitFullscreen");
				cy.stub(win.HTMLElement.prototype, "requestFullscreen").as(
					"requestFullscreen"
				);
			},
		});
	});

	it("toggles fullscreen on default button click", () => {
		cy.get(".wx-fullscreen-button").first().as("default-button");
		cy.get("@default-button").click();
		cy.get("@requestFullscreen").should("have.been.called");

		cy.get("@default-button").click();
		cy.get("@exitFullscreen").should("have.been.calledOnce");
		cy.shot("toggle-fullscreen-default-button");
	});
	it("toggles fullscreen on custom button click", () => {
		cy.get(".demo-button > .wx-button").as("button");
		cy.get("@button").click();
		cy.get("@requestFullscreen").should("have.been.called");

		cy.get("@button").click();
		cy.get("@exitFullscreen").should("have.been.calledOnce");
		cy.shot("toggle-fullscreen-custom-button");
	});
	it("toggles fullscreen on keyboard shortcut", () => {
		cy.get("input").first().focus();
		cy.get("body").type("{ctrl}{shift}f");
		cy.get("@requestFullscreen").should("have.been.called");

		cy.get("body").type("{ctrl}{shift}f");
		cy.get("@exitFullscreen").should("have.been.calledOnce");
		cy.shot("toggle-fullscreen-shortcut");
	});
});
