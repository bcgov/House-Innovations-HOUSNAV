import {
  TESTID_WALKTHROUGH_FOOTER_NEXT,
  GET_TESTID_CHECKBOX,
  GET_TESTID_RADIO,
  GET_TESTID_NUMBER_FIELD,
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
    cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();
  });

  if (walkthrough.result) {
    if (walkthrough.result) {
      const result = results[walkthrough.result];
      if (result) {
        cy.contains(result);
      } else {
        throw new Error("Result not defined in results data");
      }
    }
  }
};
