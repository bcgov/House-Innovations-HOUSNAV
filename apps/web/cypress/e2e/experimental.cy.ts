import { TESTID_WALKTHROUGH_FOOTER_NEXT } from "@repo/constants/src/testids";

import { walkthroughs } from "../fixtures/extra-test-data.json";
import { results } from "../fixtures/results-data.json";

describe("Experimental tests", () => {
  beforeEach(() => {
    cy.visit("/walkthrough/9.9.9");
  });

  let walkthroughNumber = 1;

  // Test all walkthroughs defined in extra test data
  // Does not worry if checkboxes or radio buttons are used
  walkthroughs.forEach((walkthrough) => {
    it(`Walkthrough #${walkthroughNumber}`, () => {
      walkthrough.steps.forEach((step) => {
        // Skip tapping the button if the answer is empty
        if (step.answer != "") {
          // Select and submit an answer for the given question
          step.answer.split(",").forEach((answer) => {
            cy.get(`[data-testid*='${step.question}-${answer}']`).last().click({
              force: true,
            });
          });
        }
        cy.getByGeneralTestID(TESTID_WALKTHROUGH_FOOTER_NEXT).click();
      });

      if (walkthrough.result) {
        // Cypress will throw an error if the result is undefined
        const result = results[walkthrough.result as keyof typeof results];
        cy.contains(result);
      }
    });
    walkthroughNumber++;
  });

  // Randomly go through the walkthough until you find a result (try to confirm there are no dead ends)
  for (let i = 0; i < 200; i++) {
    it(`Random walkthrough produces result: run ${i}`, () => {
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
          }
        });
      }
      // At the end, confirm we are on a result page
      cy.getByTestID("result").should("exist");
    });
  }
});
