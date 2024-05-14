describe("walkthroughs", () => {
  it("loads the homepage", () => {
    cy.visit("/");
  });

  //Skip accessibility test until we have real first page
  it.skip("should be accessible", () => {
    cy.visit("/");
    cy.injectAxe();
    cy.checkA11y();
  });
});
