import { TESTID_WALKTHROUGH_FOOTER_BACK } from "@repo/constants/src/testids";
import { TEMP_GET_URL_SINGLE_DWELLING_WALKTHROUGH } from "@repo/constants/src/urls";
import { EnumWalkthroughIds } from "@repo/constants/src/constants";

import { runWalkthrough } from "../support/helpers";

import { walkthroughs } from "../fixtures/single-dwelling-9.10.14-test-data.json";
import { results } from "../fixtures/results-data.json";

describe("single dwelling: 9.10.14", () => {
  beforeEach(() => {
    cy.visit(
      TEMP_GET_URL_SINGLE_DWELLING_WALKTHROUGH(EnumWalkthroughIds._9_10_14),
    );
  });

  // Test all walkthroughs defined in test data
  walkthroughs.forEach((walkthrough) => {
    it(walkthrough.title, () => {
      runWalkthrough(walkthrough, results.workflow2);
    });
  });

  it("new walkthrough works correctly after using back button", () => {
    /**
     * This test is designed to test that backing doesn't yield incorrect data. the back button functionality.
     * In theory you can use any walkthroughs here, but if they both take the same path for most of it, you will have trouble on checkbox screens.
     * TODO - Update checkbox screens to unselect unused options
     * TODO - Make selecting walkthroughs less brittle
     */
    const firstWalkthrough = walkthroughs[12];
    const secondWalkthrough = walkthroughs[16];

    // Run the first walkthrough
    if (firstWalkthrough) {
      runWalkthrough(firstWalkthrough, results.workflow2);

      // Go back to the beginning
      for (let i = 0; i < firstWalkthrough.steps.length; i++) {
        cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_BACK).click();
      }
    } else {
      throw new Error("Walkthrough does not exist in workflow data");
    }
    // Run the second walkthrough
    if (secondWalkthrough) {
      runWalkthrough(secondWalkthrough, results.workflow2);
    } else {
      throw new Error("Walkthrough does not exist in workflow data");
    }
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
