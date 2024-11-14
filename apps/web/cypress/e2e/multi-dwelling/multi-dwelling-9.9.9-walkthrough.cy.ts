import { URLS_GET_WALKTHROUGH } from "@repo/constants/src/urls";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import {
  answerCurrentQuestion,
  getWalkthrough,
  navigateToNextQuestion,
  runWalkthrough,
} from "../../support/helpers";
import {
  GET_TESTID_STEP_TRACKER_WALKTHROUGH_HEADER,
  TESTID_QUESTION,
} from "@repo/constants/src/testids";
import { walkthroughs } from "../../fixtures/multi-dwelling/multi-dwelling-9.9.9-test-data.json";
import { results } from "../../fixtures/results-data.json";

describe("multi dwelling: 9.9.9 walkthrough", () => {
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
    cy.getByTestID(
      GET_TESTID_STEP_TRACKER_WALKTHROUGH_HEADER(EnumWalkthroughIds._9_9_9),
    ).should("be.hidden");
  });

  it.only("validate p18 shows value from previous question p5", () => {
    // This walkthrough should hit both P5 and P18
    const walkthroughContainingP5P18 = getWalkthrough(walkthroughs, 1);
    let p5AnswerValue = "";

    for (const step of walkthroughContainingP5P18.steps) {
      if (step.question === "P5") {
        p5AnswerValue = step.answer;
      }
      if (step.question === "P18") {
        cy.getByTestID(TESTID_QUESTION).contains(
          `Does this dwelling unit have separate and direct access from each storey to a balcony on storey(s): ${p5AnswerValue}?`,
        );
        break;
      }
      answerCurrentQuestion(step);
      navigateToNextQuestion();
    }
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
