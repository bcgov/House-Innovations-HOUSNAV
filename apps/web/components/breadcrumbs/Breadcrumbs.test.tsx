// 3rd party
import { describe, expect, it, vi } from "vitest";
import * as NextNavigation from "next/navigation";
// repo
import {
  GET_TESTID_BREADCRUMBS_BREADCRUMB,
  TESTID_BREADCRUMB_HOME,
  TESTID_BREADCRUMB_LAST,
  TESTID_BREADCRUMBS,
} from "@repo/constants/src/testids";
import { EnumBuildingTypes } from "@repo/constants/src/constants";
import { URL_PATH_WALKTHROUGH } from "@repo/constants/src/urls";
// local
import { renderWithWalkthroughProvider } from "../../tests/utils";
import Breadcrumbs from "./Breadcrumbs";

// mock next/navigation
vi.mock("next/navigation");

describe("Breadcrumbs", () => {
  it("renders 3 items", () => {
    const URL_BUILDING_TYPE = EnumBuildingTypes.SINGLE_DWELLING;
    vi.mocked(NextNavigation.useSelectedLayoutSegments).mockReturnValueOnce([
      URL_BUILDING_TYPE,
      URL_PATH_WALKTHROUGH,
    ]);

    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <Breadcrumbs />,
    });

    expect(getByTestId(TESTID_BREADCRUMBS)).toBeInTheDocument();
    expect(getByTestId(TESTID_BREADCRUMBS).children).toHaveLength(3);
    expect(getByTestId(TESTID_BREADCRUMB_HOME)).toBeInTheDocument();
    expect(
      getByTestId(GET_TESTID_BREADCRUMBS_BREADCRUMB(URL_BUILDING_TYPE)),
    ).toBeInTheDocument();
    expect(getByTestId(TESTID_BREADCRUMB_LAST)).toBeInTheDocument();
  });
  it("renders 2 items", () => {
    const URL_BUILDING_TYPE = EnumBuildingTypes.MULTI_DWELLING;
    vi.mocked(NextNavigation.useSelectedLayoutSegments).mockReturnValueOnce([
      URL_BUILDING_TYPE,
    ]);

    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <Breadcrumbs />,
    });

    expect(getByTestId(TESTID_BREADCRUMBS)).toBeInTheDocument();
    expect(getByTestId(TESTID_BREADCRUMBS).children).toHaveLength(2);
    expect(getByTestId(TESTID_BREADCRUMB_HOME)).toBeInTheDocument();
    expect(getByTestId(TESTID_BREADCRUMB_LAST)).toBeInTheDocument();
  });
  it("doesn't render with empty segments", () => {
    vi.mocked(NextNavigation.useSelectedLayoutSegments).mockReturnValueOnce([]);

    const { queryByTestId } = renderWithWalkthroughProvider({
      ui: <Breadcrumbs />,
    });

    expect(queryByTestId(TESTID_BREADCRUMBS)).not.toBeInTheDocument();
  });
});
