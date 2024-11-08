// repo
import {
  GET_TESTID_LINK_CARD,
  TESTID_BREADCRUMBS,
} from "@repo/constants/src/testids";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import { URLS_GET_BUILDING_TYPE } from "@repo/constants/src/urls";

describe("single dwelling: landing", () => {
  beforeEach(() => {
    cy.visit(URLS_GET_BUILDING_TYPE(EnumBuildingTypes.SINGLE_DWELLING));
  });

  it("should display correct ui elements", () => {
    cy.getByTestID(TESTID_BREADCRUMBS).should("be.visible");

    cy.getByTestID(GET_TESTID_LINK_CARD(EnumWalkthroughIds._9_9_9)).should(
      "be.visible",
    );
    cy.getByTestID(GET_TESTID_LINK_CARD(EnumWalkthroughIds._9_10_14)).should(
      "be.visible",
    );
  });

  it("should be able to navigate to 9.9.9", () => {
    cy.getByTestID(GET_TESTID_LINK_CARD(EnumWalkthroughIds._9_9_9)).click();
    cy.url().should("contain", EnumWalkthroughIds._9_9_9);
  });

  it("should be able to navigate to 9.10.14", () => {
    cy.getByTestID(GET_TESTID_LINK_CARD(EnumWalkthroughIds._9_10_14)).click();
    cy.url().should("contain", EnumWalkthroughIds._9_10_14);
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
