// repo
import {
  GET_TESTID_BUTTON,
  GET_TESTID_CHECKBOX_CARD,
  GET_TESTID_LINK,
  TESTID_BUILD_WIZARD_BEGIN_WALKTHROUGH,
  TESTID_BUILD_WIZARD_SELECT_ALL,
  TESTID_BUILD_WIZARD_TOTAL_AVAILABLE,
  TESTID_BUILD_WIZARD_TOTAL_SELECTED,
} from "@repo/constants/src/testids";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import { URLS_GET_BUILDING_TYPE } from "@repo/constants/src/urls";
import { BuildingTypeJSONData } from "@repo/data/useBuildingTypeData";

describe("multi dwelling: landing", () => {
  beforeEach(() => {
    cy.visit(URLS_GET_BUILDING_TYPE(EnumBuildingTypes.MULTI_DWELLING));
  });

  it("should display correct ui elements", () => {
    cy.getByTestID(GET_TESTID_CHECKBOX_CARD(EnumWalkthroughIds._9_9_9)).should(
      "exist",
    );
    cy.getByTestID(
      GET_TESTID_CHECKBOX_CARD(EnumWalkthroughIds._9_10_14),
    ).should("exist");
    cy.getByTestID(GET_TESTID_BUTTON(TESTID_BUILD_WIZARD_SELECT_ALL)).should(
      "exist",
    );
    cy.getByTestID(
      GET_TESTID_LINK(TESTID_BUILD_WIZARD_BEGIN_WALKTHROUGH),
    ).should("exist");
    cy.getByTestID(TESTID_BUILD_WIZARD_TOTAL_AVAILABLE).should("exist");
    cy.getByTestID(TESTID_BUILD_WIZARD_TOTAL_SELECTED).should("exist");
  });

  it("should update total selected when single checkbox is selected", () => {
    cy.getByTestID(TESTID_BUILD_WIZARD_TOTAL_SELECTED).should("contain", "0");
    cy.getLabelByTestID(
      GET_TESTID_CHECKBOX_CARD(EnumWalkthroughIds._9_9_9),
    ).click();
    cy.getByTestID(TESTID_BUILD_WIZARD_TOTAL_SELECTED).should("contain", "1");
  });

  it("should check all checkboxes when select all button is pressed", () => {
    const totalNumberOfCheckboxCards =
      BuildingTypeJSONData[EnumBuildingTypes.MULTI_DWELLING].walkthroughs
        .length;
    cy.getByTestID(TESTID_BUILD_WIZARD_TOTAL_SELECTED).should("contain", "0");
    cy.getByTestID(GET_TESTID_BUTTON(TESTID_BUILD_WIZARD_SELECT_ALL)).click();
    cy.getByTestID(TESTID_BUILD_WIZARD_TOTAL_SELECTED).should(
      "contain",
      totalNumberOfCheckboxCards,
    );
  });

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11yWithErrorLogging();
  });
});
