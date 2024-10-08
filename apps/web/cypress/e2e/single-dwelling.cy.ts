import { GET_TESTID_LINK_CARD } from "@repo/constants/src/testids";

describe("single dwelling", () => {
  beforeEach(() => {
    cy.visit("/single-dwelling");
  });

  it("should display correct ui elements", () => {
    cy.getByTestID(GET_TESTID_LINK_CARD("9.9.9")).should("exist");
    cy.getByTestID(GET_TESTID_LINK_CARD("9.10.14")).should("exist");
  });

  it("should be able to navigate to 9.9.9", () => {
    const walkthroughId = "9.9.9";
    cy.getByTestID(GET_TESTID_LINK_CARD(walkthroughId)).click();
    cy.url().should("contain", walkthroughId);
  });

  it("should be able to navigate to 9.10.14", () => {
    const walkthroughId = "9.10.14";
    cy.getByTestID(GET_TESTID_LINK_CARD(walkthroughId)).click();
    cy.url().should("contain", walkthroughId);
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
