// 3rd party
import { describe, expect, it } from "vitest";
// repo
import {
  GET_TESTID_BUTTON,
  TESTID_WALKTHROUGH_FOOTER_BACK,
  TESTID_WALKTHROUGH_FOOTER_NEXT,
  TESTID_WALKTHROUGH_FOOTER_START_OVER,
} from "@repo/constants/src/testids";
import useWalkthroughTestData, {
  getFirstResult,
} from "@repo/data/useWalkthroughTestData";
// local
import WalkthroughFooter from "./WalkthroughFooter";
import { renderWithWalkthroughProvider } from "../../tests/utils";

describe("WalkthroughFooter", () => {
  it("renders", () => {
    // render component
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <WalkthroughFooter />,
    });

    // expect back and next to render
    expect(
      getByTestId(GET_TESTID_BUTTON(TESTID_WALKTHROUGH_FOOTER_BACK)),
    ).toBeInTheDocument();
    expect(
      getByTestId(GET_TESTID_BUTTON(TESTID_WALKTHROUGH_FOOTER_NEXT)),
    ).toBeInTheDocument();
  });
  // answer first question wrong and verify results screen with start over button
  it("renders start over button", async () => {
    // setup data so first question is a result to test start over button displaying
    const walkthroughData = useWalkthroughTestData();
    const resultData = getFirstResult();
    walkthroughData.sections[
      walkthroughData.info.startingSectionId
    ]?.sectionQuestions.unshift(resultData.resultKey);

    // render component
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <WalkthroughFooter />,
      data: walkthroughData,
    });

    // expect to find start over button
    expect(
      getByTestId(GET_TESTID_BUTTON(TESTID_WALKTHROUGH_FOOTER_START_OVER)),
    ).toBeInTheDocument();
  });
});
