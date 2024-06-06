import {
  GET_TESTID_RADIO,
  TESTID_QUESTION_SUBMIT,
  GET_TESTID_CHECKBOX_GROUP,
} from "@repo/constants/src/testids";

describe("walkthrough 1", () => {
  beforeEach(() => {
    cy.visit("/walkthrough/9.9.9");
  });

  it("can be navigated", () => {
    // select and submit an answer for the first question
    // TODO - randomize which answer is selected
    cy.getByTestID(GET_TESTID_RADIO("P01", "yes")).click();
    cy.getByGeneralTestID(TESTID_QUESTION_SUBMIT).click();

    // confirm we are showing the second question
    cy.getByTestID(GET_TESTID_CHECKBOX_GROUP("P02"));
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  it("error state should be accessible", () => {
    // press submit button without selecting a radio button to show error state
    cy.getByGeneralTestID(TESTID_QUESTION_SUBMIT).click();

    // confirm error message is visible
    // TODO - replace with TESTID_RADIO_GROUP_ERROR once it works
    cy.get(".ui-RadioGroup--Error");

    cy.injectAxe();
    cy.checkA11y();
  });
});
