import {
  TESTID_WALKTHROUGH_FOOTER_NEXT,
  GET_TESTID_CHECKBOX,
  GET_TESTID_RADIO,
  GET_TESTID_NUMBER_FIELD,
  TESTID_BUTTON_MODAL_CLOSE,
  TESTID_DEFINED_TERM,
  GET_TESTID_BUTTON,
} from "@repo/constants/src/testids";

interface Walkthrough {
  title: string;
  steps: Step[];
  result?: string;
  resultValue?: string;
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

export function navigateThroughWalkthrough(walkthrough: Walkthrough) {
  walkthrough.steps.forEach((step) => {
    // Select and submit an answer for the given question
    if (step.type === "radio") {
      cy.getByTestID(GET_TESTID_RADIO(step.question, step.answer)).click();
    } else if (step.type === "checkbox") {
      // Skip tapping the checkbox if the answer is empty
      if (step.answer !== "") {
        step.answer.split(",").forEach((answer) => {
          cy.getInputByTestID(GET_TESTID_CHECKBOX(step.question, answer))
            .invoke("prop", "checked")
            .then((checked) => {
              if (!checked) {
                cy.getInputByTestID(
                  GET_TESTID_CHECKBOX(step.question, answer),
                ).click({ force: true });
              }
            });
        });
      }
    } else if (step.type === "input") {
      cy.getByTestID(GET_TESTID_NUMBER_FIELD(step.question))
        .find("input")
        .type(step.answer);
    }

    // Open and close the glossary modal to check accessibility for step if needed
    if (step.checkGlossary) {
      cy.get("body").then(($body) => {
        const definedTerms = $body.find(
          `[data-testid*="button-${TESTID_DEFINED_TERM}-"]`,
        );

        // Click the first defined term if it exists
        if (definedTerms[0]) {
          definedTerms[0].click();
          cy.getByTestID(GET_TESTID_BUTTON(TESTID_BUTTON_MODAL_CLOSE)).click();
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
          cy.getByTestID(GET_TESTID_BUTTON(TESTID_BUTTON_MODAL_CLOSE)).click();
        }
      });
    }
    // Test accessibility for the current step
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();

    cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();
  });
}

export const runWalkthrough = (walkthrough: Walkthrough, results: Results) => {
  navigateThroughWalkthrough(walkthrough);

  if (walkthrough.result) {
    const result = results[walkthrough.result];
    // Check if the walkthrough is on the correct result page
    if (result) {
      cy.contains(result);

      // Check if the result has a specific value
      if (walkthrough.resultValue) {
        cy.contains(walkthrough.resultValue);
      }
    } else {
      throw new Error("Result not defined in results data");
    }
    // Test accessibility for the result
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  }
};

//Get a specific walkthrough from a list of them without having to worry about it not existing
export const getWalkthrough = (walkthroughs: Walkthrough[], index: number) => {
  const walkthrough = walkthroughs[index];
  if (!walkthrough) {
    throw new Error("Walkthrough does not exist in workflow data");
  }
  return walkthrough;
};
