import {
  getWalkthrough,
  navigateThroughWalkthrough,
  runWalkthrough,
} from "../support/helpers";
import { walkthroughs } from "../fixtures/building-type-analysis-test-data.json";
import { results } from "../fixtures/results-data.json";
import {
  GET_TESTID_BUTTON,
  GET_TESTID_LINK,
  GET_TESTID_RESULT_BANNER,
  TESTID_RESULT_CONTENT_CONTINUE,
  TESTID_RESULT_RETURN_TO_HOME,
  TESTID_WALKTHROUGH_FOOTER_START_OVER,
} from "@repo/constants/src/testids";
import { STR_BUILDING_TYPE_ANALYSIS_ID } from "@repo/constants/src/constants";

describe("building type analysis tests", () => {
  beforeEach(() => {
    cy.visit("/building-type-analysis");
  });

  // Test all walkthroughs defined in test data
  walkthroughs.forEach((walkthrough) => {
    it(walkthrough.title, () => {
      runWalkthrough(walkthrough, results.building_type_analysis);
    });
  });

  it("should display correct ui elements on last page", () => {
    navigateThroughWalkthrough(getWalkthrough(walkthroughs, 0));
    cy.getByTestID(
      GET_TESTID_RESULT_BANNER(STR_BUILDING_TYPE_ANALYSIS_ID),
    ).should("be.visible");
    cy.getByTestID(GET_TESTID_LINK(TESTID_RESULT_RETURN_TO_HOME)).should(
      "be.visible",
    );
    cy.getByTestID(GET_TESTID_LINK(TESTID_RESULT_CONTENT_CONTINUE)).should(
      "be.visible",
    );
    cy.getByTestID(
      GET_TESTID_BUTTON(TESTID_WALKTHROUGH_FOOTER_START_OVER),
    ).should("be.visible");
  });
});
