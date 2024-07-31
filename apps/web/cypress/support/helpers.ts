import {
  TESTID_WALKTHROUGH_FOOTER_NEXT,
  GET_TESTID_CHECKBOX,
  GET_TESTID_RADIO,
  GET_TESTID_NUMBER_FIELD,
  TESTID_BUTTON_MODAL_CLOSE,
  TESTID_DEFINED_TERM,
  TESTID_QUESTION_CODE_REFERENCE_BUTTON,
} from "@repo/constants/src/testids";

interface Walkthrough {
  title: string;
  steps: Step[];
  result?: string;
}

interface Step {
  type: string;
  question: string;
  answer: string;
  checkGlossary?: boolean;
  checkBuildingCode?: boolean;
}

interface Results {
  [key: string]: string;
}

export const runWalkthrough = (walkthrough: Walkthrough, results: Results) => {
  walkthrough.steps.forEach((step) => {
    // Select and submit an answer for the given question
    if (step.type === "radio") {
      cy.getByTestID(GET_TESTID_RADIO(step.question, step.answer)).click();
    } else if (step.type === "checkbox") {
      // Skip tapping the checkbox if the answer is empty
      if (step.answer !== "") {
        step.answer.split(",").forEach((answer) => {
          cy.getInputByTestID(GET_TESTID_CHECKBOX(step.question, answer)).click(
            { force: true },
          );
        });
      }
    } else if (step.type === "input") {
      cy.getByTestID(GET_TESTID_NUMBER_FIELD(step.question))
        .find("input")
        .type(step.answer);
    }
    cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click({
      force: true,
    });

    // Open and close the glossary modal to check accessibility for step if needed
    if (step.checkGlossary) {
      cy.get("body").then(($body) => {
        const definedTerms = $body.find(
          `[data-testid*="button-${TESTID_DEFINED_TERM}-"]`,
        );

        // Click the first defined term if it exists
        if (definedTerms[0]) {
          definedTerms[0].click();
          cy.getByTestID(`button-${TESTID_BUTTON_MODAL_CLOSE}`).click();
        }
      });
    }
    // Open and close the building code modal to check accessibility for step if needed
    if (step.checkBuildingCode) {
      cy.get("body").then(($body) => {
        const reference = $body.find(`[data-testid*="button-code"]`);

        // Click the first building code reference if it exists
        if (reference[0]) {
          reference[0].click();
          cy.getByTestID(
            `button-${TESTID_QUESTION_CODE_REFERENCE_BUTTON}`,
          ).click();
        }
      });
    }
    // Test accessibility for the current step
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });

  if (walkthrough.result) {
    const result = results[walkthrough.result];
    if (result) {
      cy.contains(result);
    } else {
      throw new Error("Result not defined in results data");
    }
    // Test accessibility for the result
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  }
};
