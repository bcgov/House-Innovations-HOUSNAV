// 3rd party
import { describe, expect, it } from "vitest";
// repo
import {
  GET_TESTID_BUTTON,
  TESTID_STEP_TRACKER,
  TESTID_STEP_TRACKER_MOBILE,
  TESTID_STEP_TRACKER_MOBILE_BUTTON_CLOSE,
  TESTID_STEP_TRACKER_MOBILE_BUTTON_OPEN,
} from "@repo/constants/src/testids";
// local
import StepTracker from "./StepTracker";
import { renderWithWalkthroughProvider } from "../../tests/utils";
import { act, waitFor } from "@testing-library/react";

describe("StepTracker", () => {
  it("renders", () => {
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <StepTracker />,
    });

    expect(getByTestId(TESTID_STEP_TRACKER)).toBeInTheDocument();
  });
  it("mobile modal appears when button clicked", async () => {
    const { user, getByTestId, queryByTestId } = renderWithWalkthroughProvider({
      ui: <StepTracker />,
    });

    const button = getByTestId(
      GET_TESTID_BUTTON(TESTID_STEP_TRACKER_MOBILE_BUTTON_OPEN),
    );
    expect(button).toBeInTheDocument();
    expect(queryByTestId(TESTID_STEP_TRACKER_MOBILE)).not.toBeInTheDocument();
    await act(async () => {
      await user.click(button);
    });

    await waitFor(() => {
      expect(getByTestId(TESTID_STEP_TRACKER_MOBILE)).toBeInTheDocument();
    });

    expect(
      getByTestId(GET_TESTID_BUTTON(TESTID_STEP_TRACKER_MOBILE_BUTTON_CLOSE)),
    ).toBeInTheDocument();
  });
});
