"use client";

import {
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import "./Link.css";

export interface LinkProps extends ReactAriaLinkProps {}

export default function Link({ className, ...props }: LinkProps) {
  return <ReactAriaLink className={`ui-Link ${className}`} {...props} />;
}
