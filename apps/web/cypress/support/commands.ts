/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Print cypress-axe violations to the terminal
import * as axe from "axe-core";

function printAccessibilityViolations(violations: axe.Result[]) {
  cy.task(
    "table",
    violations.map(({ id, impact, description, nodes }) => ({
      impact,
      description: `${description} (${id})`,
      nodes: nodes.length,
    })),
  );
}

Cypress.Commands.add("getByTestID", (id, options) => {
  return cy.get(`[data-testid='${id}']`, options);
});

Cypress.Commands.add("getByGeneralTestID", (id, options) => {
  return cy.get(`[data-testid*='${id}']`, options);
});

Cypress.Commands.add("getInputByTestID", (id, options) => {
  return cy.get(`input[data-testid='${id}']`, options);
});

Cypress.Commands.add("checkA11yWithErrorLogging", () => {
  cy.checkA11y(undefined, undefined, printAccessibilityViolations);
});
