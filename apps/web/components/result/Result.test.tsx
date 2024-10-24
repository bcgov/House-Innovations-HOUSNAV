// 3rd party
import { describe, expect, it, vi } from "vitest";
// repo
import {
  GET_TESTID_RESULT_RELATED_ITEM,
  TESTID_RESULT,
  GET_TESTID_RESULT_BANNER,
  TESTID_RESULT_PDF_BUTTON,
  TESTID_RESULT_PRINT_CONTENT,
  TESTID_RESULT_RETURN_TO_HOME,
} from "@repo/constants/src/testids";
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import {
  getResultData,
  useWalkthroughTestData999,
} from "@repo/data/useWalkthroughsTestData";
import useBuildingTypeData from "@repo/data/useBuildingTypeData";
// local
import { renderWithWalkthroughProvider } from "../../tests/utils";
import Result from "./Result";

// mock next/navigation
const URL_BUILDING_TYPE = EnumBuildingTypes.SINGLE_DWELLING;
vi.mock("next/navigation", () => ({
  useParams: () => ({
    buildingType: URL_BUILDING_TYPE,
  }),
}));

const getWalkthroughDataWithResultShown = () => {
  const walkthroughData = useWalkthroughTestData999();
  const resultData = getResultData();
  walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].sections[
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].info
      .startingSectionId
  ]?.sectionQuestions.unshift(resultData.resultKey);
  return walkthroughData;
};

describe("Result", () => {
  it("renders correct default ui", () => {
    // get data with a result as the first item
    const walkthroughData = getWalkthroughDataWithResultShown();

    // render component
    const { getByTestId, queryByTestId } = renderWithWalkthroughProvider({
      ui: <Result />,
      data: walkthroughData,
    });

    // expect result screen
    expect(getByTestId(TESTID_RESULT)).toBeInTheDocument();

    // expect related building type
    const buildingTypeData = useBuildingTypeData({
      buildingType: URL_BUILDING_TYPE,
    });
    buildingTypeData.relatedBuildingTypes.forEach((buildingType) => {
      expect(
        getByTestId(GET_TESTID_RESULT_RELATED_ITEM(buildingType)),
      ).toBeInTheDocument();
    });

    // expect pdf items
    expect(getByTestId(TESTID_RESULT_PDF_BUTTON)).toBeInTheDocument();
    expect(getByTestId(TESTID_RESULT_PRINT_CONTENT)).toBeInTheDocument();

    // expect banner
    expect(getByTestId(GET_TESTID_RESULT_BANNER())).toBeInTheDocument();

    // expect return to home not to be in the document
    expect(queryByTestId(TESTID_RESULT_RETURN_TO_HOME)).not.toBeInTheDocument();
  });
  // hide pdf
  it("does not render pdf button when resultsHidePDF is true", () => {
    const walkthroughData = getWalkthroughDataWithResultShown();
    walkthroughData.resultsDisplay = { hidePDF: true };

    const { queryByTestId } = renderWithWalkthroughProvider({
      ui: <Result />,
      data: walkthroughData,
    });

    expect(queryByTestId(TESTID_RESULT_PDF_BUTTON)).not.toBeInTheDocument();
    expect(queryByTestId(TESTID_RESULT_PRINT_CONTENT)).not.toBeInTheDocument();
  });
  // hide banner
  it("does not render banner when resultsHideBanner is true", () => {
    const walkthroughData = getWalkthroughDataWithResultShown();
    walkthroughData.resultsDisplay = { hideBanner: true };

    const { queryByTestId } = renderWithWalkthroughProvider({
      ui: <Result />,
      data: walkthroughData,
    });

    expect(queryByTestId(GET_TESTID_RESULT_BANNER())).not.toBeInTheDocument();
  });
  // hide related items
  it("does not render related items when resultsHideRelatedItems is true", () => {
    const walkthroughData = getWalkthroughDataWithResultShown();
    walkthroughData.resultsDisplay = { hideRelatedItems: true };

    const { queryByTestId } = renderWithWalkthroughProvider({
      ui: <Result />,
      data: walkthroughData,
    });

    const buildingTypeData = useBuildingTypeData({
      buildingType: URL_BUILDING_TYPE,
    });
    buildingTypeData.relatedBuildingTypes.forEach((buildingType) => {
      expect(
        queryByTestId(GET_TESTID_RESULT_RELATED_ITEM(buildingType)),
      ).not.toBeInTheDocument();
    });
  });
  // return to home
  it("renders return to home when resultsShowReturnToHome is true", () => {
    const walkthroughData = getWalkthroughDataWithResultShown();
    walkthroughData.resultsDisplay = { showReturnToHome: true };

    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <Result />,
      data: walkthroughData,
    });

    expect(getByTestId(TESTID_RESULT_RETURN_TO_HOME)).toBeInTheDocument();
  });
});
