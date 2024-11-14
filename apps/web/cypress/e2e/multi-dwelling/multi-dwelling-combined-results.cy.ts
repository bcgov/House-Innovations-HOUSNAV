import { URLS_GET_WALKTHROUGH } from "@repo/constants/src/urls";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import {
  getWalkthrough,
  navigateThroughWalkthrough,
} from "../../support/helpers";
import { walkthroughs } from "../../fixtures/multi-dwelling/multi-dwelling-combined-test-data.json";
import {
  GET_TESTID_RESULT_CONTENT_ITEM,
  GET_TESTID_RESULT_PDF_RESULT_CONTENT,
  GET_TESTID_RESULT_PRINT_CONTENT_WALKTHROUGH,
  GET_TESTID_RESULT_RELATED_ITEM,
  TESTID_BREADCRUMBS,
  TESTID_RESULT_NOTES,
} from "@repo/constants/src/testids";

describe("multi dwelling: 9.9.9 and 9.10.14 walkthrough results", () => {
  beforeEach(() => {
    cy.visit(
      URLS_GET_WALKTHROUGH(EnumBuildingTypes.MULTI_DWELLING, [
        EnumWalkthroughIds._9_9_9,
        EnumWalkthroughIds._9_10_14,
      ]),
    );
    navigateThroughWalkthrough(getWalkthrough(walkthroughs, 0));
  });

  it("should display correct ui elements", () => {
    cy.getByTestID(TESTID_BREADCRUMBS).should("be.visible");

    cy.getByTestID(
      GET_TESTID_RESULT_CONTENT_ITEM(EnumWalkthroughIds._9_9_9),
    ).should("be.visible");
    //this might need to be changed if the viewport changes since what is on versus what is off
    // the screen which requires scrolling is dependent on the screen size
    cy.getByTestID(
      GET_TESTID_RESULT_CONTENT_ITEM(EnumWalkthroughIds._9_10_14),
    ).scrollIntoView();
    cy.getByTestID(
      GET_TESTID_RESULT_CONTENT_ITEM(EnumWalkthroughIds._9_10_14),
    ).should("be.visible");
    cy.getByTestID(
      GET_TESTID_RESULT_RELATED_ITEM(EnumBuildingTypes.SINGLE_DWELLING),
    ).scrollIntoView();
    cy.getByTestID(
      GET_TESTID_RESULT_RELATED_ITEM(EnumBuildingTypes.SINGLE_DWELLING),
    ).should("be.visible");
    //should display correct print content
    cy.getByTestID(
      GET_TESTID_RESULT_PRINT_CONTENT_WALKTHROUGH(EnumWalkthroughIds._9_9_9),
    ).should("be.hidden");
    cy.getByTestID(
      GET_TESTID_RESULT_PRINT_CONTENT_WALKTHROUGH(EnumWalkthroughIds._9_10_14),
    ).should("be.hidden");
    cy.getByTestID(
      GET_TESTID_RESULT_CONTENT_ITEM(
        GET_TESTID_RESULT_PDF_RESULT_CONTENT(EnumWalkthroughIds._9_10_14),
      ),
    ).should("be.hidden");
    cy.getByTestID(TESTID_RESULT_NOTES).should("be.visible");
  });

  it("should be able to navigate to related item landing page", () => {
    cy.getByTestID(
      GET_TESTID_RESULT_RELATED_ITEM(EnumBuildingTypes.SINGLE_DWELLING),
    ).click();
    cy.url().should("contain", EnumBuildingTypes.SINGLE_DWELLING);
  });
});
