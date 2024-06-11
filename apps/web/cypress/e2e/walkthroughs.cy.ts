import { TESTID_WALKTHROUGH_FOOTER_NEXT } from "@repo/constants/src/testids";

import { walkthroughs } from "../fixtures/test-data.json";

describe("walkthrough 1", () => {
  beforeEach(() => {
    cy.visit("/walkthrough/9.9.9");
  });

  //Test all walkthroughs defined in test data
  walkthroughs.forEach((walkthrough) => {
    it(walkthrough.title, () => {
      walkthrough.steps.forEach((step) => {
        // TODO - use test ids
        // select and submit an answer for the given question
        cy.getByTestID(`${step.type}-${step.question}-${step.answer}`).click();
        cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();
      });
      if (walkthrough.result) {
        cy.contains(walkthrough.result);
      }
    });
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y();
  });
});
