// 3rd party
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
// repo
import { TESTID_ICON } from "@repo/constants/src/testids";
// workspace
import Icon, { IconType } from "./Icon";

// test constants
export const getIconTestId = (type: IconType | string) =>
  `${TESTID_ICON}-${type}`;

describe("Icon", () => {
  // close
  it("renders close icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon type="close" id="closeIcon" title="close the menu" />,
    );
    const closeIcon = getByTestId(getIconTestId("close"));
    expect(closeIcon).toBeInTheDocument();
    expect(closeIcon).toHaveAttribute("aria-labelledby", "closeIcon");
    expect(getByTitle("close the menu")).toBeInTheDocument();
  });
  it("renders close icon without title", () => {
    const { getByTestId, queryByTitle } = render(<Icon type="close" />);
    expect(getByTestId(getIconTestId("close"))).toBeInTheDocument();
    expect(queryByTitle("close the menu")).not.toBeInTheDocument();
  });
  // menu
  it("renders menu icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon type="menu" id="menuIcon" title="open the menu" />,
    );
    const menuIcon = getByTestId(getIconTestId("menu"));
    expect(menuIcon).toBeInTheDocument();
    expect(menuIcon).toHaveAttribute("aria-labelledby", "menuIcon");
    expect(getByTitle("open the menu")).toBeInTheDocument();
  });
  it("renders menu icon without title", () => {
    const { getByTestId, queryByTitle } = render(<Icon type="menu" />);
    expect(getByTestId(getIconTestId("menu"))).toBeInTheDocument();
    expect(queryByTitle("open the menu")).not.toBeInTheDocument();
  });
  // arrowOutward
  it("renders arrowOutward icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon
        type="arrowOutward"
        id="arrowOutwardIcon"
        title="arrow pointing outward"
      />,
    );
    const arrowOutwardIcon = getByTestId(getIconTestId("arrowOutward"));
    expect(arrowOutwardIcon).toBeInTheDocument();
    expect(arrowOutwardIcon).toHaveAttribute(
      "aria-labelledby",
      "arrowOutwardIcon",
    );
    expect(getByTitle("arrow pointing outward")).toBeInTheDocument();
  });
  it("renders arrowOutward icon without title", () => {
    const { getByTestId, queryByTitle } = render(<Icon type="arrowOutward" />);
    expect(getByTestId(getIconTestId("arrowOutward"))).toBeInTheDocument();
    expect(queryByTitle("arrow pointing outward")).not.toBeInTheDocument();
  });
  // openInNew
  it("renders openInNew icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon type="openInNew" id="openInNewIcon" title="open in a new tab" />,
    );
    const openInNewIcon = getByTestId(getIconTestId("openInNew"));
    expect(openInNewIcon).toBeInTheDocument();
    expect(openInNewIcon).toHaveAttribute("aria-labelledby", "openInNewIcon");
    expect(getByTitle("open in a new tab")).toBeInTheDocument();
  });
  it("renders openInNew icon without title", () => {
    const { getByTestId, queryByTitle } = render(<Icon type="openInNew" />);
    expect(getByTestId(getIconTestId("openInNew"))).toBeInTheDocument();
    expect(queryByTitle("open in a new tab")).not.toBeInTheDocument();
  });
  // className
  it("renders icon with className", () => {
    const { getByTestId } = render(
      <Icon type="close" className="customClass" />,
    );
    expect(getByTestId(getIconTestId("close"))).toHaveClass("customClass");
  });
  // custom testid
  it("renders icon with testid", () => {
    const { getByTestId } = render(
      <Icon type="close" data-testid="passedValue" />,
    );
    expect(getByTestId(getIconTestId("passedValue"))).toBeInTheDocument();
  });
  // custom color prop
  it("renders icon with custom color", () => {
    const { getByTestId } = render(<Icon type="close" fill="red" />);
    expect(getByTestId(getIconTestId("close"))).toHaveAttribute("fill", "red");
  });
});
