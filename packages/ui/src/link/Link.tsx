"use client";

import {
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import "./link.css";

export interface LinkProps extends ReactAriaLinkProps {}

export default function Link({ ...props }: LinkProps) {
  return <ReactAriaLink {...props} />;
}
