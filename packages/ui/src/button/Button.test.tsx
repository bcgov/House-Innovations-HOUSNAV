// 3rd party
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
// repo
import { TESTID_BUTTON } from "@repo/constants/testids";
// workspace
import Button, { ButtonVariant, codeIconType } from "./Button";
import { getIconTestId } from "../icon/Icon.test";

// test constants
const TEXT = "Press me";
const getButtonTestId = (variant: ButtonVariant | string) =>
  `${TESTID_BUTTON}-${variant}`;

describe("Button", () => {
  it("renders button text", () => {
    const { getByText } = render(<Button>{TEXT}</Button>);
    expect(getByText(TEXT)).toBeInTheDocument();
  });
  // primary
  it("renders primary button", () => {
    const { getByTestId } = render(<Button variant="primary">{TEXT}</Button>);
    expect(getByTestId(getButtonTestId("primary"))).toBeInTheDocument();
  });
  // secondary
  it("renders secondary button", () => {
    const { getByTestId } = render(<Button variant="secondary">{TEXT}</Button>);
    expect(getByTestId(getButtonTestId("secondary"))).toBeInTheDocument();
  });
  // link
  it("renders link button", () => {
    const { getByTestId } = render(<Button variant="link">{TEXT}</Button>);
    expect(getByTestId(getButtonTestId("link"))).toBeInTheDocument();
  });
  // code
  it("renders code button", () => {
    const { getByTestId } = render(<Button variant="code">{TEXT}</Button>);
    expect(getByTestId(getButtonTestId("code"))).toBeInTheDocument();
    expect(getByTestId(getIconTestId(codeIconType))).toBeInTheDocument();
  });
  // large
  it("renders large button", () => {
    const { getByTestId } = render(<Button isLargeButton>{TEXT}</Button>);
    expect(getByTestId(getButtonTestId("primary"))).toHaveClass("large");
  });
  // icon
  it("renders icon button", () => {
    const { getByTestId } = render(<Button isIconButton>{TEXT}</Button>);
    expect(getByTestId(getButtonTestId("primary"))).toHaveClass("icon");
  });
  // custom testid
  it("renders custom testid", () => {
    const testid = "custom";
    const { getByTestId } = render(
      <Button data-testid={testid}>{TEXT}</Button>,
    );
    expect(getByTestId(getButtonTestId(testid))).toBeInTheDocument();
  });
  // custom className
  it("renders custom className", () => {
    const className = "custom";
    const { getByTestId } = render(
      <Button className={className}>{TEXT}</Button>,
    );
    expect(getByTestId(getButtonTestId("primary"))).toHaveClass(className);
  });
  // custom prop name
  it("renders custom prop name", () => {
    const name = "custom";
    const { getByTestId } = render(<Button name={name}>{TEXT}</Button>);
    expect(getByTestId(getButtonTestId("primary"))).toHaveAttribute(
      "name",
      name,
    );
  });
});
