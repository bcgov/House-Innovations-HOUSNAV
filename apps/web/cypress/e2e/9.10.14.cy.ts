import {
  TESTID_WALKTHROUGH_FOOTER_NEXT,
  GET_TESTID_CHECKBOX,
  GET_TESTID_RADIO,
  GET_TESTID_NUMBER_FIELD,
} from "@repo/constants/src/testids";

import { walkthroughs } from "../fixtures/workflow2-test-data.json";
import { results } from "../fixtures/results-data.json";

describe("walkthrough 2", () => {
  beforeEach(() => {
    cy.visit("/walkthrough/9.10.14");
  });

  // Test all walkthroughs defined in test data
  walkthroughs.forEach((walkthrough) => {
    it(walkthrough.title, () => {
      walkthrough.steps.forEach((step) => {
        // Select and submit an answer for the given question
        if (step.type === "radio") {
          cy.getByTestID(GET_TESTID_RADIO(step.question, step.answer)).click();
        } else if (step.type === "checkbox") {
          // Skip tapping the checkbox if the answer is empty
          if (step.answer != "") {
            step.answer.split(",").forEach((answer) => {
              cy.getInputByTestID(
                GET_TESTID_CHECKBOX(step.question, answer),
              ).click({ force: true });
            });
          }
        } else if (step.type === "input") {
          cy.getByTestID(GET_TESTID_NUMBER_FIELD(step.question))
            .find("input")
            .type(step.answer);
        }
        cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();
      });
      if (walkthrough.result) {
        // Cypress will throw an error if the result is undefined
        const result =
          results.workflow2[
            walkthrough.result as keyof typeof results.workflow2
          ];
        cy.contains(result);
      }
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
