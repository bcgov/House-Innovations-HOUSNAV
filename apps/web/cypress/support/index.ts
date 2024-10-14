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

      /**
       * Get an input element by the data-testid attribute.
       * This is often used to find checkboxes as they have duplicate IDs for the label and input.
       * @example cy.getInputByTestID('question-title')
       */
      getInputByTestID(id: string): Chainable<JQuery<HTMLElement>>;
      getInputByTestID(
        id: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Get a label element by the data-testid attribute.
       * This is often used to find checkboxes as they have duplicate IDs for the label and input.
       * @example cy.getInputByTestID('question-title')
       */
      getLabelByTestID(id: string): Chainable<JQuery<HTMLElement>>;
      getLabelByTestID(
        id: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Check the accessibility of the page or an element.
       * @example cy.checkA11yWithErrorLogging()
       */
      checkA11yWithErrorLogging(): Chainable<void>;
    }
  }
}
