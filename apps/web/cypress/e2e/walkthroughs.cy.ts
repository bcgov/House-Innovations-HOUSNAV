import {
  GET_TESTID_RADIO,
  GET_TESTID_CHECKBOX_GROUP,
  TESTID_WALKTHROUGH_FOOTER_NEXT,
} from "@repo/constants/src/testids";

describe("walkthrough 1", () => {
  beforeEach(() => {
    cy.visit("/walkthrough/9.9.9");
  });

  it("can be navigated", () => {
    // select and submit an answer for the first question
    // TODO - randomize which answer is selected
    cy.getByTestID(GET_TESTID_RADIO("P01", "notSure")).click();
    cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();

    // confirm we are showing the second question
    cy.getByTestID(GET_TESTID_CHECKBOX_GROUP("P02"));
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y();
  });
});
