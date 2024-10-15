import {
  TESTID_WALKTHROUGH_FOOTER_NEXT,
  GET_TESTID_CHECKBOX,
  GET_TESTID_RADIO,
} from "@repo/constants/src/testids";
import { URLS_WALKTHROUGHS } from "@repo/constants/src/urls";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";

import { walkthroughs } from "../fixtures/single-dwelling-9.9.9-test-data.json";
import { results } from "../fixtures/results-data.json";
import { runWalkthrough } from "../support/helpers";

describe("single dwelling: 9.9.9", () => {
  beforeEach(() => {
    cy.visit(
      URLS_WALKTHROUGHS[EnumBuildingTypes.SINGLE_DWELLING][
        EnumWalkthroughIds._9_9_9
      ],
    );
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
    cy.getLabelByTestID(GET_TESTID_CHECKBOX("P02", "17")).click();
    cy.getLabelByTestID(GET_TESTID_CHECKBOX("P02", "18")).click();

    // Show error message
    cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();

    // Test accessibility
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
