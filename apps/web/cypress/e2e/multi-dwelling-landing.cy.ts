// repo
import { GET_TESTID_CHECKBOX_CARD } from "@repo/constants/src/testids";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import { URLS_BUILDING_TYPE } from "@repo/constants/src/urls";

describe("multi dwelling: landing", () => {
  beforeEach(() => {
    cy.visit(URLS_BUILDING_TYPE[EnumBuildingTypes.MULTI_DWELLING].href);
  });

  it("should display correct ui elements", () => {
    cy.getByTestID(GET_TESTID_CHECKBOX_CARD(EnumWalkthroughIds._9_9_9)).should(
      "exist",
    );
    cy.getByTestID(
      GET_TESTID_CHECKBOX_CARD(EnumWalkthroughIds._9_10_14),
    ).should("exist");
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
