// 3rd party
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
// repo
import {
  GET_TESTID_BUTTON,
  TESTID_DEFINED_TERM,
} from "@repo/constants/src/testids";
// local
import DefinedTerm from "./DefinedTerm";

describe("DefinedTerm", () => {
  it("renders with data-term attribute", () => {
    const testTerm = "test-term";
    const { getByTestId } = render(
      <DefinedTerm term={testTerm}>Test Term</DefinedTerm>,
    );
    const button = getByTestId(
      GET_TESTID_BUTTON(`${TESTID_DEFINED_TERM}-${testTerm}`),
    );
    expect(button).toHaveAttribute("data-term", "test-term");
  });
});
