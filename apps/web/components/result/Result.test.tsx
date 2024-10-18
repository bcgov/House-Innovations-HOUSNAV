// 3rd party
import { describe, expect, it, vi } from "vitest";
// repo
import {
  GET_TESTID_RESULT_RELATED_ITEM,
  TESTID_RESULT,
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

describe("Result", () => {
  it("renders", () => {
    // construct data with a result as the first item
    const walkthroughData = useWalkthroughTestData999();
    const resultData = getResultData();
    walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].sections[
      walkthroughData.walkthroughsById[EnumWalkthroughIds._9_9_9].info
        .startingSectionId
    ]?.sectionQuestions.unshift(resultData.resultKey);

    // render component
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <Result />,
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
  });
});
