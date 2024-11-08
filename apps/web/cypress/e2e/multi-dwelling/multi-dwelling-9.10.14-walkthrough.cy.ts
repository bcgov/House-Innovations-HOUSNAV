import { URLS_GET_WALKTHROUGH } from "@repo/constants/src/urls";
import {
  EnumBreadcrumbIds,
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import { runWalkthrough } from "../../support/helpers";
import {
  GET_TESTID_BREADCRUMBS_BREADCRUMB,
  GET_TESTID_STEP_TRACKER_WALKTHROUGH_HEADER,
  TESTID_BREADCRUMBS,
} from "@repo/constants/src/testids";
import { walkthroughs } from "../../fixtures/multi-dwelling/multi-dwelling-9.10.14-test-data.json";
import { results } from "../../fixtures/results-data.json";

describe("multi dwelling: 9.10.14 walkthrough", () => {
  beforeEach(() => {
    cy.visit(
      URLS_GET_WALKTHROUGH(EnumBuildingTypes.MULTI_DWELLING, [
        EnumWalkthroughIds._9_10_14,
      ]),
    );
  });

  // Test all walkthroughs defined in test data
  walkthroughs.forEach((walkthrough) => {
    it(walkthrough.title, () => {
      runWalkthrough(walkthrough, results.multi_dwelling_workflow_91014);
    });
  });

  it("should display all parts of breadcrumbs", () => {
    cy.getByTestID(TESTID_BREADCRUMBS).should("be.visible");
    cy.getByTestID(
      GET_TESTID_BREADCRUMBS_BREADCRUMB(EnumBreadcrumbIds.HOME),
    ).should("be.visible");
    cy.getByTestID(
      GET_TESTID_BREADCRUMBS_BREADCRUMB(EnumBreadcrumbIds.MULTI_DWELLING_UNIT),
    ).should("be.visible");
    cy.getByTestID(
      GET_TESTID_BREADCRUMBS_BREADCRUMB(EnumBreadcrumbIds.LAST),
    ).should("be.visible");
  });

  it("step tracker doesn't show section headers for single section", () => {
    cy.getByTestID(
      GET_TESTID_STEP_TRACKER_WALKTHROUGH_HEADER(EnumWalkthroughIds._9_10_14),
    ).should("be.hidden");
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
