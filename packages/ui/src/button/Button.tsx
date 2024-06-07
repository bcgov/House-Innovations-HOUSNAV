"use client";
// 3rd party
import {
  Button as ReactAriaButton,
  ButtonProps as ReactAriaButtonProps,
} from "react-aria-components";
// repo
import { GET_TESTID_BUTTON } from "@repo/constants/src/testids";
// workspace
import "./Button.css";
import Icon from "../icon/Icon";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "link"
  | "code"
  | "glossary"
  | "tertiary";

export interface ButtonProps extends ReactAriaButtonProps {
  /**
   * Defaults to `primary`.
   */
  variant?: ButtonVariant;
  /**
   * If true, renders a larger button.
   */
  isLargeButton?: boolean;
  /**
   * If true, renders a square button intended for a single icon.
   */
  isIconButton?: boolean;
  /**
   * Optional testid string for targeting specific buttons.
   * Will default to `button-[variant]`.
   * eg. `data-testid="button-passedValue"`.
   */
  "data-testid"?: string;
}

export const codeIconType = "arrowOutward";

export default function Button({
  variant = "primary",
  isIconButton = false,
  isLargeButton = false,
  "data-testid": testid = "",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <ReactAriaButton
      data-testid={GET_TESTID_BUTTON(testid || variant)}
      className={`ui-Button --${variant} ${isLargeButton ? "--large" : ""} ${isIconButton ? "--icon" : ""} ${className}`}
      {...props}
    >
      <>
        {children}
        {variant === "code" ? <Icon type={codeIconType} /> : null}
      </>
    </ReactAriaButton>
  );
}
