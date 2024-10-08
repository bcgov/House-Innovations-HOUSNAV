// 3rd party
import { describe, expect, it } from "vitest";
// repo
import { TESTID_LAYOUT_FOOTER } from "@repo/constants/src/testids";
// local
import LayoutFooter from "./LayoutFooter";
import { renderWithWalkthroughProvider } from "../../tests/utils";

describe("LayoutFooter", () => {
  it("renders", () => {
    // render component
    const testid = "test-item";
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: (
        <LayoutFooter>
          <div data-testid={testid}>test</div>
        </LayoutFooter>
      ),
    });

    // expect component to render
    expect(getByTestId(TESTID_LAYOUT_FOOTER)).toBeInTheDocument();
    expect(getByTestId(testid)).toBeInTheDocument();
  });
});
