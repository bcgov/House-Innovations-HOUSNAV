"use client";

// 3rd party
import {
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

// local
import "./Link.css";
import Icon from "../icon/Icon";

export interface LinkProps extends ReactAriaLinkProps {
  /**
   * Defaults to `default`.
   */
  variant?: "default" | "glossary";
}

export default function Link({
  variant = "default",
  className = "",
  children,
  target = "_self",
  ...props
}: LinkProps) {
  return (
    <ReactAriaLink
      className={`ui-Link ${variant} ${className}`}
      {...props}
      target={target}
    >
      <>
        {children}
        {target === "_blank" ? <Icon type={"openInNew"} /> : null}
      </>
    </ReactAriaLink>
  );
}
