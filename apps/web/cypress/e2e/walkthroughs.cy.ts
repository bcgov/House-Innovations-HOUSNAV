describe("walkthrough 1", () => {
  beforeEach(() => {
    cy.visit("/walkthrough/9.9.9");
  });

  it("can be navigated", () => {
    // select and submit an answer for the first question
    cy.getByTestID("radio-P01-notSure").click();
    cy.getByTestID("button-question-submit").click();

    // confirm we are showing the second question
    cy.getByTestID("checkbox-group-P02");
  });

  it("default state should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  it("error state should be accessible", () => {
    // press submit button without selecting a radio button to show error state
    cy.getByTestID("button-question-submit").click();

    // confirm error message is visible
    // TODO - replace with TESTID_RADIO_GROUP_ERROR once it works
    cy.get(".ui-RadioGroup--Error");

    cy.injectAxe();
    cy.checkA11y();
  });
});
