// 3rd party
import { describe, expect, it } from "vitest";
import { act, render, waitFor } from "@testing-library/react";
// repo
import {
  TESTID_BUTTON_SUBMIT,
  TESTID_RADIO,
  TESTID_RADIO_GROUP,
  TESTID_RADIO_GROUP_ERROR,
  TESTID_RADIO_GROUP_LABEL,
} from "@repo/constants/src/testids";
// workspace
import RadioGroup from "./RadioGroup";
import Button from "../button/Button";
import { getButtonTestId } from "../button/Button.test";

// test constants
const RADIO_GROUP_NAME = "storeys";
const getRadioGroupTestId = (testId = RADIO_GROUP_NAME) =>
  `${TESTID_RADIO_GROUP}-${testId}`;
const getRadioTestId = (testId = RADIO_GROUP_NAME, value: string) =>
  `${TESTID_RADIO}-${testId}-${value}`;
const getRadioGroupLabelTestId = (testId = RADIO_GROUP_NAME) =>
  `${TESTID_RADIO_GROUP_LABEL}-${testId}`;
const getRadioGroupErrorTestId = (testId = RADIO_GROUP_NAME) =>
  `${TESTID_RADIO_GROUP_ERROR}-${testId}`;
const RADIO_GROUP_LABEL = "Number of storeys";
const OPTION_1_VALUE = "1";
const OPTION_2_VALUE = "2";
const RADIO_GROUP_OPTIONS = [
  { label: "1 storey", value: OPTION_1_VALUE },
  { label: "2 storeys", value: OPTION_2_VALUE },
  {
    label: (
      <>
        3&nbsp;
        <Button variant={"glossary"}>storeys</Button>
      </>
    ),
    value: "3",
  },
];

describe("RadioGroup", () => {
  // renders
  it("renders appropriate items with required data and nothing selected", () => {
    const { getByTestId } = render(
      <RadioGroup
        options={RADIO_GROUP_OPTIONS}
        label={RADIO_GROUP_LABEL}
        name={RADIO_GROUP_NAME}
      />,
    );

    // renders radio group
    expect(getByTestId(getRadioGroupTestId())).toBeInTheDocument();

    // renders label with correct text
    const label = getByTestId(getRadioGroupLabelTestId());
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent(RADIO_GROUP_LABEL);

    // renders radio options with correct values
    RADIO_GROUP_OPTIONS.forEach(({ value }) => {
      const option = getByTestId(getRadioTestId(RADIO_GROUP_NAME, value));
      const input = option.querySelector("input[type='radio']");
      expect(option).toBeInTheDocument();
      expect(input).toHaveAttribute("value", value);
      expect(input).not.toBeChecked();
    });
  });
  // default value
  it("renders item with default value as selected", () => {
    const defaultValue = OPTION_2_VALUE;
    const { getByTestId } = render(
      <RadioGroup
        options={RADIO_GROUP_OPTIONS}
        label={RADIO_GROUP_LABEL}
        name={RADIO_GROUP_NAME}
        defaultValue={defaultValue}
      />,
    );

    // get option 2
    const option2 = getByTestId(getRadioTestId(RADIO_GROUP_NAME, defaultValue));
    const input2 = option2.querySelector("input[type='radio']");
    expect(input2).toBeChecked();
  });
  // selected value overrides default value
  it("renders item with selected value as selected", () => {
    const defaultValue = OPTION_1_VALUE;
    const selectedValue = OPTION_2_VALUE;
    const { getByTestId } = render(
      <RadioGroup
        options={RADIO_GROUP_OPTIONS}
        label={RADIO_GROUP_LABEL}
        name={RADIO_GROUP_NAME}
        defaultValue={defaultValue}
        value={selectedValue}
      />,
    );

    // get option 3
    const option3 = getByTestId(
      getRadioTestId(RADIO_GROUP_NAME, selectedValue),
    );
    const input3 = option3.querySelector("input[type='radio']");
    expect(input3).toBeChecked();
  });
  // shows error
  it("renders error message when provided, is required, and not selected on submit", () => {
    const errorMessage = "Please select a number of storeys";
    const { getByTestId, queryByTestId } = render(
      <form>
        <RadioGroup
          options={RADIO_GROUP_OPTIONS}
          label={RADIO_GROUP_LABEL}
          name={RADIO_GROUP_NAME}
          isRequired
          errorMessageText={errorMessage}
        />
        <Button type={"submit"} data-testid={TESTID_BUTTON_SUBMIT}>
          Submit
        </Button>
      </form>,
    );

    // no error message
    expect(queryByTestId(getRadioGroupErrorTestId())).not.toBeInTheDocument();

    // submit form
    act(() => {
      getByTestId(getButtonTestId(TESTID_BUTTON_SUBMIT)).click();
    });

    // error message
    waitFor(() => {
      expect(getByTestId(getRadioGroupErrorTestId())).toHaveTextContent(
        errorMessage,
      );
    });
  });
  // hides label
  it("applies hidden utility class when hideLabel is true", () => {
    const { queryByTestId } = render(
      <RadioGroup
        options={RADIO_GROUP_OPTIONS}
        label={RADIO_GROUP_LABEL}
        name={RADIO_GROUP_NAME}
        hideLabel
      />,
    );

    expect(queryByTestId(getRadioGroupLabelTestId())).toHaveClass("u-hidden");
  });
  // custom testid
  it("renders custom testid", () => {
    const testid = "custom";
    const { getByTestId } = render(
      <RadioGroup
        options={RADIO_GROUP_OPTIONS}
        label={RADIO_GROUP_LABEL}
        name={RADIO_GROUP_NAME}
        data-testid={testid}
      />,
    );

    expect(getByTestId(getRadioGroupTestId(testid))).toBeInTheDocument();
  });
  // custom className
  it("renders custom className", () => {
    const className = "custom";
    const { getByTestId } = render(
      <RadioGroup
        options={RADIO_GROUP_OPTIONS}
        label={RADIO_GROUP_LABEL}
        name={RADIO_GROUP_NAME}
        className={className}
      />,
    );

    expect(getByTestId(getRadioGroupTestId())).toHaveClass(className);
  });
  // passes prop
  it("passes props", () => {
    const customPropKey = "data-custom-prop";
    const customPropValue = "custom";
    const customProp = {
      [customPropKey]: customPropValue,
    };
    const { getByTestId } = render(
      <RadioGroup
        options={RADIO_GROUP_OPTIONS}
        label={RADIO_GROUP_LABEL}
        name={RADIO_GROUP_NAME}
        {...customProp}
      />,
    );

    expect(getByTestId(getRadioGroupTestId())).toHaveAttribute(
      customPropKey,
      customPropValue,
    );
  });
});
