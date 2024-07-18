import {
  TESTID_WALKTHROUGH_FOOTER_NEXT,
  GET_TESTID_CHECKBOX,
  GET_TESTID_RADIO,
} from "@repo/constants/src/testids";

import { walkthroughs } from "../fixtures/workflow1-test-data.json";
import { results } from "../fixtures/results-data.json";
import { runWalkthrough } from "../support/helpers";

describe("walkthrough 1", () => {
  beforeEach(() => {
    cy.visit("/walkthrough/9.9.9");
  });

  // Test all walkthroughs defined in test data
  walkthroughs.forEach((walkthrough) => {
    it(walkthrough.title, () => {
      runWalkthrough(walkthrough, results.workflow1);
    });
  });

  it("error state should be accessible", () => {
    cy.getByTestID(GET_TESTID_RADIO("P01", "notSure")).click();
    cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();

    // Select both "none" and another option
    cy.getInputByTestID(GET_TESTID_CHECKBOX("P02", "17")).click({
      force: true,
    });
    cy.getInputByTestID(GET_TESTID_CHECKBOX("P02", "18")).click({
      force: true,
    });

    // Show error message
    cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();

    // Test accessibility
    cy.injectAxe();
    cy.checkA11y();
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y();
  });
});
