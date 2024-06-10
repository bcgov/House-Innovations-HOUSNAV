// 3rd party
import { describe, expect, it } from "vitest";
// repo
import {
  GET_TESTID_BUTTON,
  TESTID_WALKTHROUGH_FOOTER_BACK,
  TESTID_WALKTHROUGH_FOOTER_NEXT,
} from "@repo/constants/src/testids";
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
});
