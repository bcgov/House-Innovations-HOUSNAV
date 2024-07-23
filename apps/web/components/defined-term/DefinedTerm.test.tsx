// 3rd party
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
// repo
import {
  GET_TESTID_BUTTON,
  TESTID_BUTTON_MODAL_CLOSE,
  TESTID_DEFINED_TERM,
  TESTID_MODAL_SIDE,
} from "@repo/constants/src/testids";
// local
import DefinedTerm from "./DefinedTerm";
import userEvent from "@testing-library/user-event";

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

  it("opens and closes model when defined-term clicked", async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};

    const testTerm = "test-term";
    const { getByTestId } = render(
      <DefinedTerm term={testTerm}>Test Term</DefinedTerm>,
    );
    const button = getByTestId(
      GET_TESTID_BUTTON(`${TESTID_DEFINED_TERM}-${testTerm}`),
    );

    await userEvent.click(button);
    const modal = getByTestId(TESTID_MODAL_SIDE);
    expect(modal).toBeInTheDocument();

    const closeButton = getByTestId(
      GET_TESTID_BUTTON(TESTID_BUTTON_MODAL_CLOSE),
    );

    await userEvent.click(closeButton);
    expect(modal).not.toBeInTheDocument();
  });
});
