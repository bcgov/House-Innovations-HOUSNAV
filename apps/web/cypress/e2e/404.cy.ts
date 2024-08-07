import { TESTID_404_IMAGE } from "@repo/constants/src/testids";

describe("404", () => {
  beforeEach(() => {
    cy.visit("/not-a-real-page", { failOnStatusCode: false });
  });

  it("should show 404 page", () => {
    cy.request({ url: "/not-a-real-page", failOnStatusCode: false })
      .its("status")
      .should("equal", 404);
    cy.getByTestID(TESTID_404_IMAGE).should("exist");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
