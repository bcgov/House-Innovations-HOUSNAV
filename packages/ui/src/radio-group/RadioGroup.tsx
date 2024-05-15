"use client";
// 3rd party
import {
  RadioGroup as ReactAriaRadioGroup,
  Radio as ReactAriaRadio,
  RadioGroupProps as ReactAriaRadioGroupProps,
  Label,
} from "react-aria-components";
import { JSX } from "react";
// repo
import {
  TESTID_RADIO,
  TESTID_RADIO_GROUP,
  TESTID_RADIO_GROUP_ERROR,
  TESTID_RADIO_GROUP_LABEL,
} from "@repo/constants/src/testids";
import { AnswerValueTypes } from "@repo/data/useWalkthroughData";
// workspace
import "./RadioGroup.css";
import Icon from "../icon/Icon";
import InputError from "../input-error/InputError";

export type RadioGroupOption = {
  value: AnswerValueTypes;
  label: string | JSX.Element;
};

export interface RadioGroupProps extends ReactAriaRadioGroupProps {
  /**
   * The name of the radio group.
   */
  name: string;
  /**
   * The label for the radio group.
   */
  label: string;
  /**
   * boolean to hide the label.
   */
  hideLabel?: boolean;
  /**
   * The radio options.
   */
  options: RadioGroupOption[];
  /**
   * Optional testid string for targeting specific radio groups.
   * Will default to `radio-group-[name]`.
   * eg. `data-testid="button-passedValue"`.
   */
  "data-testid"?: string;
  /**
   * Optional error message to display.
   */
  errorMessageText?: string;
}

export default function RadioGroup({
  name,
  label,
  hideLabel,
  errorMessageText,
  options,
  "data-testid": testid = "",
  defaultValue,
  value,
  className,
  ...props
}: RadioGroupProps) {
  const currentValue = value || defaultValue;
  const testIdNamespace = testid || name;

  return (
    <ReactAriaRadioGroup
      className={`ui-RadioGroup ${className}`}
      data-testid={`${TESTID_RADIO_GROUP}-${testIdNamespace}`}
      value={value}
      defaultValue={defaultValue}
      {...props}
    >
      <Label
        className={`ui-RadioGroupLabel ${hideLabel ? "u-hidden" : ""}`}
        data-testid={`${TESTID_RADIO_GROUP_LABEL}-${testIdNamespace}`}
      >
        {label}
      </Label>
      {options.map((option) => (
        <ReactAriaRadio
          className={"ui-Radio"}
          key={`${option.value}`}
          value={`${option.value}`}
          data-testid={`${TESTID_RADIO}-${testIdNamespace}-${option.value}`}
        >
          {currentValue === option.value && (
            <Icon type="radioChecked" className="ui-RadioIcon" />
          )}
          {currentValue !== option.value && (
            <Icon type="radioUnchecked" className="ui-RadioIcon" />
          )}
          {option.label}
        </ReactAriaRadio>
      ))}
      <InputError
        data-testid={`${TESTID_RADIO_GROUP_ERROR}-${testIdNamespace}`}
        className={"ui-RadioGroupError"}
      >
        {errorMessageText}
      </InputError>
    </ReactAriaRadioGroup>
  );
}
