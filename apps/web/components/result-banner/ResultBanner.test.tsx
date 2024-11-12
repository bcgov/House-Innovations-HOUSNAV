// 3rd party
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
// local
import ResultBanner from "./ResultBanner";

describe("ResultBanner", () => {
  it("Renders and passes through custom prop", () => {
    const DISPLAY_TEXT = "Success!";
    const TESTID = "custom-testid";
    const { getByTestId } = render(
      <ResultBanner text={DISPLAY_TEXT} data-testid={TESTID} />,
    );

    expect(getByTestId(TESTID)).toHaveTextContent(DISPLAY_TEXT);
  });
});
