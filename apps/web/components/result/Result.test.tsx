// 3rd party
import { describe, expect, it } from "vitest";
// repo
import { TESTID_RESULT } from "@repo/constants/src/testids";
// local
import { renderWithWalkthroughProvider } from "../../tests/utils";
import Result from "./Result";

describe("Result", () => {
  it("renders", () => {
    // render component
    const { getByTestId } = renderWithWalkthroughProvider({
      ui: <Result displayMessage="result message here" />,
    });

    // expect back and next to render
    expect(getByTestId(TESTID_RESULT)).toBeInTheDocument();
  });
});
