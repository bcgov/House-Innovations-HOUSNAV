import { TESTID_WALKTHROUGH_FOOTER_NEXT } from "@repo/constants/src/testids";

describe("Experimental tests", () => {
  beforeEach(() => {
    cy.visit("/walkthrough/9.9.9");
  });

  // Randomly go through the walkthough until you find a result (try to confirm there are no dead ends)
  for (let i = 0; i < 200; i++) {
    it.only(`Random walkthrough produces retult: run ${i}`, () => {
      for (let i = 0; i < 25; i++) {
        cy.get("body").then(($body) => {
          if ($body.find('[data-testid*="checkbox-"]').length > 0) {
            // Click a random checkbox if we are on a checkbox question
            const checkboxes = $body.find('[data-testid*="checkbox-"]');
            const randomIndex = Cypress._.random(1, checkboxes.length - 1);
            cy.wrap(checkboxes[randomIndex]).click({
              force: true,
            });

            // Click next
            cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();
          } else if ($body.find('[data-testid*="radio-"]').length > 0) {
            // Click a random radio button if we are on a radio button question
            const radios = $body.find('[data-testid*="radio-"]');
            const randomIndex = Cypress._.random(0, radios.length - 1);
            cy.wrap(radios[randomIndex]).click();

            // Click next
            cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();
          } else {
            // If there are no questions, confirm we are on a result page
            cy.getByTestID("result").should("exist");
            return;
          }
        });
      }
    });
  }
});
