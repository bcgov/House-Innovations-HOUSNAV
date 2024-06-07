// 3rd party
import { describe, expect, it } from "vitest";
// repo
import { TESTID_WALKTHROUGH } from "@repo/constants/src/testids";
// local
import Walkthrough from "./Walkthrough";
import { renderWithWalkthroughProvider } from "../../tests/utils";

describe("Walkthrough", () => {
  it("renders", () => {
    // render component
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <Walkthrough />,
    });

    // expect component to render
    expect(getByTestId(TESTID_WALKTHROUGH)).toBeInTheDocument();
  });
});
