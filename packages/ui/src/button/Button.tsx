"use client";

import {
  Button as ReactAriaButton,
  ButtonProps as ReactAriaButtonProps,
} from "react-aria-components";

import "./Button.css";
import Icon from "../icon/Icon";

export interface ButtonProps extends ReactAriaButtonProps {
  /**
   * Defaults to `primary`.
   */
  variant?: "primary" | "secondary" | "link" | "code";
  /**
   * If true, renders a larger button.
   */
  isLargeButton?: boolean;
  /**
   * If true, renders a square button intended for a single icon.
   */
  isIconButton?: boolean;
}

export default function Button({
  variant = "primary",
  isIconButton = false,
  isLargeButton = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <ReactAriaButton
      className={`ui-Button ${variant} ${isLargeButton ? "large" : ""} ${isIconButton ? "icon" : ""} ${className}`}
      {...props}
    >
      <>
        {children}
        {variant === "code" ? <Icon type={"arrowOutward"} /> : null}
      </>
    </ReactAriaButton>
  );
}
