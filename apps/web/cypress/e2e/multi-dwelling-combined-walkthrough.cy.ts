import { URLS_GET_WALKTHROUGH } from "@repo/constants/src/urls";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";

import { walkthroughs } from "../fixtures/multi-dwelling-combined-test-data.json";
import { results } from "../fixtures/results-data.json";
import { runWalkthrough } from "../support/helpers";
import { TESTID_WALKTHROUGH_FOOTER_BACK } from "@repo/constants/src/testids";

describe("multi dwelling: 9.9.9 and 9.10.14", () => {
  beforeEach(() => {
    cy.visit(
      URLS_GET_WALKTHROUGH(EnumBuildingTypes.MULTI_DWELLING, [
        EnumWalkthroughIds._9_9_9,
        EnumWalkthroughIds._9_10_14,
      ]),
    );
  });

  // Test all walkthroughs defined in test data
  walkthroughs.forEach((walkthrough) => {
    it(walkthrough.title, () => {
      runWalkthrough(walkthrough, results.multi_dwelling_workflow_combined);
    });
  });

  it("new walkthrough works correctly after using back button and selecting different answers", () => {
    /**
     * This test is designed to test that backing doesn't yield incorrect data. the back button functionality.
     */
    const firstWalkthrough = walkthroughs[0];
    const secondWalkthrough = walkthroughs[1];

    // Run the first walkthrough
    if (firstWalkthrough) {
      runWalkthrough(
        firstWalkthrough,
        results.multi_dwelling_workflow_combined,
      );

      // Go back to the beginning
      for (let i = 0; i < firstWalkthrough.steps.length; i++) {
        cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_BACK).click();
      }
    } else {
      throw new Error("First walkthrough does not exist in workflow data");
    }
    // Run the second walkthrough with different questions
    if (secondWalkthrough) {
      runWalkthrough(
        secondWalkthrough,
        results.multi_dwelling_workflow_combined,
      );
    } else {
      throw new Error("Second walkthrough does not exist in workflow data");
    }
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
