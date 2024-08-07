import { GET_TESTID_WALKTHROUGH_CARD } from "@repo/constants/src/testids";

describe("home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to navigate to walkthrough 1", () => {
    const walkthrough = "9.9.9";
    cy.getByTestID(GET_TESTID_WALKTHROUGH_CARD(walkthrough)).click();
    cy.url().should("contain", walkthrough);
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
