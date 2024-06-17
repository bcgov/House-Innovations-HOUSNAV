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
          step.answer.split(",").forEach((answer) => {
            // TODO - update the application to not have duplicate test ids on checkboxes
            cy.getByTestID(GET_TESTID_CHECKBOX(step.question, answer))
              .last()
              .click({ force: true });
          });
        }
        cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();
      });
      if (walkthrough.result) {
        cy.contains(results[walkthrough.result]);
      }
    });
  });

  it("error state should be accessible", () => {
    cy.getByTestID(GET_TESTID_RADIO("P01", "notSure")).click();
    cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();

    // Select both "none" and another option
    cy.getByTestID(GET_TESTID_CHECKBOX("P02", "17"))
      .last()
      .click({ force: true });
    cy.getByTestID(GET_TESTID_CHECKBOX("P02", "18"))
      .last()
      .click({ force: true });

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
