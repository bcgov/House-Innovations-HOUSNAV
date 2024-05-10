// 3rd party
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
// repo
import { TESTID_LINK } from "@repo/constants/src/testids";
// workspace
import Link, { LinkVariant } from "./Link";
import { getIconTestId } from "../icon/Icon.test";

// test constants
const TEXT = "Press me";
const getLinkTestId = (variant: LinkVariant | string) =>
  `${TESTID_LINK}-${variant}`;

describe("Button", () => {
  it("renders link text", () => {
    const { getByText } = render(<Link>{TEXT}</Link>);
    expect(getByText(TEXT)).toBeInTheDocument();
  });
  // default
  it("renders default link", () => {
    const { getByTestId } = render(<Link>{TEXT}</Link>);
    expect(getByTestId(getLinkTestId("default"))).toBeInTheDocument();
  });
  // glossary
  it("renders glossary link", () => {
    const { getByTestId } = render(<Link variant="glossary">{TEXT}</Link>);
    expect(getByTestId(getLinkTestId("glossary"))).toBeInTheDocument();
  });
  // target
  it("renders link with blank target and icon", () => {
    const { getByTestId } = render(<Link target="_blank">{TEXT}</Link>);
    expect(getByTestId(getLinkTestId("default"))).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(getByTestId(getIconTestId("openInNew"))).toBeInTheDocument();
  });
  // custom testid
  it("renders link with testid", () => {
    const { getByTestId } = render(
      <Link data-testid="passedValue">{TEXT}</Link>,
    );
    expect(getByTestId(getLinkTestId("passedValue"))).toBeInTheDocument();
  });
  // className
  it("renders link with className", () => {
    const { getByTestId } = render(<Link className="passedValue">{TEXT}</Link>);
    expect(getByTestId(getLinkTestId("default"))).toHaveClass("passedValue");
  });
  // href
  it("renders link with href", () => {
    const { getByTestId } = render(
      <Link href="https://example.com">{TEXT}</Link>,
    );
    expect(getByTestId(getLinkTestId("default"))).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });
});
