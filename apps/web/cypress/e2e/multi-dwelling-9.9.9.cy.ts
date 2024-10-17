import { URLS_GET_WALKTHROUGH } from "@repo/constants/src/urls";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import { runWalkthrough } from "../support/helpers";
import { TESTID_STEP_TRACKER_WALKTHROUGH_HEADER } from "@repo/constants/src/testids";
import { walkthroughs } from "../fixtures/multi-dwelling-9.9.9-test-data.json";
import { results } from "../fixtures/results-data.json";

describe("multi dwelling: 9.9.9", () => {
  beforeEach(() => {
    cy.visit(
      URLS_GET_WALKTHROUGH(EnumBuildingTypes.MULTI_DWELLING, [
        EnumWalkthroughIds._9_9_9,
      ]),
    );
  });

  // Test all walkthroughs defined in test data
  walkthroughs.forEach((walkthrough) => {
    it(walkthrough.title, () => {
      runWalkthrough(walkthrough, results.multi_dwelling_workflow_999);
    });
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
