import {
  GET_TESTID_LINK_CARD,
  TESTID_BUILDING_TYPE,
} from "@repo/constants/src/testids";
import { EnumBuildingTypes } from "@repo/constants/src/constants";
import {
  URL_BUILDING_TYPE,
  URLS_BUILDING_TYPE,
} from "@repo/constants/src/urls";

describe("home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display correct ui elements", () => {
    cy.getByTestID(
      GET_TESTID_LINK_CARD(EnumBuildingTypes.SINGLE_DWELLING),
    ).should("exist");
    cy.getByTestID(
      GET_TESTID_LINK_CARD(EnumBuildingTypes.MULTI_DWELLING),
    ).should("exist");
    cy.getByTestID(GET_TESTID_LINK_CARD(TESTID_BUILDING_TYPE)).should("exist");
  });

  it("should be able to navigate to single dwelling unit page", () => {
    cy.getByTestID(
      GET_TESTID_LINK_CARD(EnumBuildingTypes.SINGLE_DWELLING),
    ).click();
    cy.url().should(
      "contain",
      URLS_BUILDING_TYPE[EnumBuildingTypes.SINGLE_DWELLING].href,
    );
  });

  it("should be able to navigate to multi dwelling unit page", () => {
    cy.getByTestID(
      GET_TESTID_LINK_CARD(EnumBuildingTypes.MULTI_DWELLING),
    ).click();
    cy.url().should(
      "contain",
      URLS_BUILDING_TYPE[EnumBuildingTypes.MULTI_DWELLING].href,
    );
  });

  it("should be able to navigate to building type analysis page", () => {
    cy.getByTestID(GET_TESTID_LINK_CARD(TESTID_BUILDING_TYPE)).click();
    cy.url().should("contain", URL_BUILDING_TYPE);
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
