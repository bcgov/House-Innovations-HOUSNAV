declare global {
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace Cypress {
    interface Chainable {
      /**
       * Get an element by the data-testid attribute
       * @example cy.getByTestID('question-title')
       */
      getByTestID(id: string): Chainable<JQuery<HTMLElement>>;
      getByTestID(
        id: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Get all elements with a data-testid containing a certain value.
       * Usually one would use this to grab a whole subset of elements
       * that have variable data-testid values but are identical otherwise.
       * @example cy.getByGeneralDataAttr('radio-')
       */
      getByGeneralTestID(id: string): Chainable<JQuery<HTMLElement>>;
      getByGeneralTestID(
        id: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
