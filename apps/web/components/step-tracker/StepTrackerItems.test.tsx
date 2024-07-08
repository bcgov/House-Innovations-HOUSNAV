// 3rd party
import { describe, expect, it } from "vitest";
// repo
import { TESTID_STEP_TRACKER_ITEMS } from "@repo/constants/src/testids";
// local
import StepTrackerItems from "./StepTrackerItems";
import { renderWithWalkthroughProvider } from "../../tests/utils";

describe("StepTrackerItems", () => {
  it("renders", () => {
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <StepTrackerItems />,
    });

    expect(getByTestId(TESTID_STEP_TRACKER_ITEMS)).toBeInTheDocument();
  });
});
