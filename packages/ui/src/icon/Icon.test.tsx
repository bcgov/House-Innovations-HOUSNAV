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
  // radioChecked
  it("renders radioChecked icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon
        type="radioChecked"
        id="radioCheckedIcon"
        title="Radio button checked"
      />,
    );
    const RadioCheckedIcon = getByTestId(getIconTestId("radioChecked"));
    expect(RadioCheckedIcon).toBeInTheDocument();
    expect(RadioCheckedIcon).toHaveAttribute(
      "aria-labelledby",
      "radioCheckedIcon",
    );
    expect(getByTitle("Radio button checked")).toBeInTheDocument();
  });
  it("renders radioChecked icon without title", () => {
    const { getByTestId, queryByTitle } = render(<Icon type="radioChecked" />);
    expect(getByTestId(getIconTestId("radioChecked"))).toBeInTheDocument();
    expect(queryByTitle("Radio button checked")).not.toBeInTheDocument();
  });
  // radioUnchecked
  it("renders radioUnchecked icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon
        type="radioUnchecked"
        id="radioUncheckedIcon"
        title="Radio button unchecked"
      />,
    );
    const RadioUncheckedIcon = getByTestId(getIconTestId("radioUnchecked"));
    expect(RadioUncheckedIcon).toBeInTheDocument();
    expect(RadioUncheckedIcon).toHaveAttribute(
      "aria-labelledby",
      "radioUncheckedIcon",
    );
    expect(getByTitle("Radio button unchecked")).toBeInTheDocument();
  });
  it("renders radioUnchecked icon without title", () => {
    const { getByTestId, queryByTitle } = render(
      <Icon type="radioUnchecked" />,
    );
    expect(getByTestId(getIconTestId("radioUnchecked"))).toBeInTheDocument();
    expect(queryByTitle("Radio button unchecked")).not.toBeInTheDocument();
  });
  // checkboxChecked
  it("renders checkboxChecked icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon
        type="checkboxChecked"
        id="checkboxCheckedIcon"
        title="Checkbox checked"
      />,
    );
    const CheckboxCheckedIcon = getByTestId(getIconTestId("checkboxChecked"));
    expect(CheckboxCheckedIcon).toBeInTheDocument();
    expect(CheckboxCheckedIcon).toHaveAttribute(
      "aria-labelledby",
      "checkboxCheckedIcon",
    );
    expect(getByTitle("Checkbox checked")).toBeInTheDocument();
  });
  it("renders checkboxChecked icon without title", () => {
    const { getByTestId, queryByTitle } = render(
      <Icon type="checkboxChecked" />,
    );
    expect(getByTestId(getIconTestId("checkboxChecked"))).toBeInTheDocument();
    expect(queryByTitle("Checkbox checked")).not.toBeInTheDocument();
  });
  // checkboxUnchecked
  it("renders checkboxUnchecked icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon
        type="checkboxUnchecked"
        id="checkboxUncheckedIcon"
        title="Checkbox unchecked"
      />,
    );
    const CheckboxUncheckedIcon = getByTestId(
      getIconTestId("checkboxUnchecked"),
    );
    expect(CheckboxUncheckedIcon).toBeInTheDocument();
    expect(CheckboxUncheckedIcon).toHaveAttribute(
      "aria-labelledby",
      "checkboxUncheckedIcon",
    );
    expect(getByTitle("Checkbox unchecked")).toBeInTheDocument();
  });
  it("renders checkboxUnchecked icon without title", () => {
    const { getByTestId, queryByTitle } = render(
      <Icon type="checkboxUnchecked" />,
    );
    expect(getByTestId(getIconTestId("checkboxUnchecked"))).toBeInTheDocument();
    expect(queryByTitle("Checkbox unchecked")).not.toBeInTheDocument();
  });
  // arrowBack
  it("renders arrowBack icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon type="arrowBack" id="arrowBackIcon" title="Go back" />,
    );
    const ArrowBackIcon = getByTestId(getIconTestId("arrowBack"));
    expect(ArrowBackIcon).toBeInTheDocument();
    expect(ArrowBackIcon).toHaveAttribute("aria-labelledby", "arrowBackIcon");
    expect(getByTitle("Go back")).toBeInTheDocument();
  });
  it("renders arrowBack icon without title", () => {
    const { getByTestId, queryByTitle } = render(<Icon type="arrowBack" />);
    expect(getByTestId(getIconTestId("arrowBack"))).toBeInTheDocument();
    expect(queryByTitle("Go back")).not.toBeInTheDocument();
  });
  // arrowForward
  it("renders arrowForward icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon type="arrowForward" id="arrowForwardIcon" title="Go forward" />,
    );
    const ArrowForwardIcon = getByTestId(getIconTestId("arrowForward"));
    expect(ArrowForwardIcon).toBeInTheDocument();
    expect(ArrowForwardIcon).toHaveAttribute(
      "aria-labelledby",
      "arrowForwardIcon",
    );
    expect(getByTitle("Go forward")).toBeInTheDocument();
  });
  it("renders arrowForward icon without title", () => {
    const { getByTestId, queryByTitle } = render(<Icon type="arrowForward" />);
    expect(getByTestId(getIconTestId("arrowForward"))).toBeInTheDocument();
    expect(queryByTitle("Go forward")).not.toBeInTheDocument();
  });
  // expandMore
  it("renders expandMore icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon type="expandMore" id="expandMoreIcon" title="Expand more" />,
    );
    const ExpandMoreIcon = getByTestId(getIconTestId("expandMore"));
    expect(ExpandMoreIcon).toBeInTheDocument();
    expect(ExpandMoreIcon).toHaveAttribute("aria-labelledby", "expandMoreIcon");
    expect(getByTitle("Expand more")).toBeInTheDocument();
  });
  it("renders expandMore icon without title", () => {
    const { getByTestId, queryByTitle } = render(<Icon type="expandMore" />);
    expect(getByTestId(getIconTestId("expandMore"))).toBeInTheDocument();
    expect(queryByTitle("Expand more")).not.toBeInTheDocument();
  });
  // check
  it("renders check icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon type="check" id="checkIcon" title="Check" />,
    );
    const CheckIcon = getByTestId(getIconTestId("check"));
    expect(CheckIcon).toBeInTheDocument();
    expect(CheckIcon).toHaveAttribute("aria-labelledby", "checkIcon");
    expect(getByTitle("Check")).toBeInTheDocument();
  });
  it("renders check icon without title", () => {
    const { getByTestId, queryByTitle } = render(<Icon type="check" />);
    expect(getByTestId(getIconTestId("check"))).toBeInTheDocument();
    expect(queryByTitle("Check")).not.toBeInTheDocument();
  });
  // accountTree
  it("renders accountTree icon with title", () => {
    const { getByTestId, getByTitle } = render(
      <Icon type="accountTree" id="accountTreeIcon" title="Account tree" />,
    );
    const AccountTreeIcon = getByTestId(getIconTestId("accountTree"));
    expect(AccountTreeIcon).toBeInTheDocument();
    expect(AccountTreeIcon).toHaveAttribute(
      "aria-labelledby",
      "accountTreeIcon",
    );
    expect(getByTitle("Account tree")).toBeInTheDocument();
  });
  it("renders accountTree icon without title", () => {
    const { getByTestId, queryByTitle } = render(<Icon type="accountTree" />);
    expect(getByTestId(getIconTestId("accountTree"))).toBeInTheDocument();
    expect(queryByTitle("Account tree")).not.toBeInTheDocument();
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
