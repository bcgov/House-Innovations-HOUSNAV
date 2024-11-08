import { TEMP_GET_URL_SINGLE_DWELLING_WALKTHROUGH } from "@repo/constants/src/urls";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import {
  getWalkthrough,
  navigateThroughWalkthrough,
} from "../../support/helpers";
import { walkthroughs } from "../../fixtures/single-dwelling/single-dwelling-9.9.9-test-data.json";
import {
  GET_TESTID_RESULT_ITEM,
  GET_TESTID_RESULT_PRINT_CONTENT_WALKTHROUGH,
  GET_TESTID_RESULT_RELATED_ITEM,
  TESTID_BREADCRUMBS,
} from "@repo/constants/src/testids";

describe("single dwelling: 9.9.9 walkthrough results", () => {
  beforeEach(() => {
    cy.visit(
      TEMP_GET_URL_SINGLE_DWELLING_WALKTHROUGH(EnumWalkthroughIds._9_9_9),
    );
    navigateThroughWalkthrough(getWalkthrough(walkthroughs, 0));
  });

  it("should display correct ui elements", () => {
    cy.getByTestID(TESTID_BREADCRUMBS).should("be.visible");

    cy.getByTestID(GET_TESTID_RESULT_ITEM(EnumWalkthroughIds._9_9_9)).should(
      "be.visible",
    );
    cy.getByTestID(
      GET_TESTID_RESULT_RELATED_ITEM(EnumBuildingTypes.MULTI_DWELLING),
    ).scrollIntoView();
    cy.getByTestID(
      GET_TESTID_RESULT_RELATED_ITEM(EnumBuildingTypes.MULTI_DWELLING),
    ).should("be.visible");
    //should display correct print content
    cy.getByTestID(
      GET_TESTID_RESULT_PRINT_CONTENT_WALKTHROUGH(EnumWalkthroughIds._9_9_9),
    ).should("be.hidden");
  });

  it("should be able to navigate to related item landing page", () => {
    cy.getByTestID(
      GET_TESTID_RESULT_RELATED_ITEM(EnumBuildingTypes.MULTI_DWELLING),
    ).click();
    cy.url().should("contain", EnumBuildingTypes.MULTI_DWELLING);
  });
});
