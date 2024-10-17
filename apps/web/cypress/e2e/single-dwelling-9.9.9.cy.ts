import {
  TESTID_WALKTHROUGH_FOOTER_NEXT,
  GET_TESTID_CHECKBOX,
  GET_TESTID_RADIO,
  TESTID_STEP_TRACKER_WALKTHROUGH_HEADER,
} from "@repo/constants/src/testids";
import { TEMP_GET_URL_SINGLE_DWELLING_WALKTHROUGH } from "@repo/constants/src/urls";
import { EnumWalkthroughIds } from "@repo/constants/src/constants";

import { walkthroughs } from "../fixtures/single-dwelling-9.9.9-test-data.json";
import { results } from "../fixtures/results-data.json";
import { runWalkthrough } from "../support/helpers";

describe("single dwelling: 9.9.9", () => {
  beforeEach(() => {
    cy.visit(
      TEMP_GET_URL_SINGLE_DWELLING_WALKTHROUGH(EnumWalkthroughIds._9_9_9),
    );
  });

  // Test all walkthroughs defined in test data
  walkthroughs.forEach((walkthrough) => {
    it(walkthrough.title, () => {
      runWalkthrough(walkthrough, results.single_dwelling_workflow_999);
    });
  });

  it("error state should be accessible", () => {
    cy.getByTestID(GET_TESTID_RADIO("P01", "notSure")).click();
    cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();

    // Select both "none" and another option
    cy.getLabelByTestID(GET_TESTID_CHECKBOX("P02", "17")).click();
    cy.getLabelByTestID(GET_TESTID_CHECKBOX("P02", "18")).click();

    // Show error message
    cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();

    // Test accessibility
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });

  it("step tracker doesn't show section headers for single section", () => {
    cy.getByTestID(TESTID_STEP_TRACKER_WALKTHROUGH_HEADER)
      .eq(0)
      .should("be.hidden");
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
