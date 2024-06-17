import {
  TESTID_WALKTHROUGH_FOOTER_NEXT,
  GET_TESTID_CHECKBOX,
  GET_TESTID_RADIO,
} from "@repo/constants/src/testids";

import { walkthroughs, results } from "../fixtures/test-data.json";

describe("walkthrough 1", () => {
  beforeEach(() => {
    cy.visit("/walkthrough/9.9.9");
  });

  //Test all walkthroughs defined in test data
  walkthroughs.forEach((walkthrough) => {
    it(walkthrough.title, () => {
      walkthrough.steps.forEach((step) => {
        // select and submit an answer for the given question
        if (step.type === "radio") {
          cy.getByTestID(GET_TESTID_RADIO(step.question, step.answer)).click();
        } else if (step.type === "checkbox") {
          // TODO - update the application to not have duplicate test ids on checkboxes
          cy.getByTestID(GET_TESTID_CHECKBOX(step.question, step.answer))
            .last()
            .click({ force: true });
        }
        cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();
      });
      if (walkthrough.result) {
        cy.contains(results[walkthrough.result]);
      }
    });
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y();
  });
});
