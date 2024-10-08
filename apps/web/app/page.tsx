"use client";
// 3rd party
import React, { JSX } from "react";
import { Heading } from "react-aria-components";
// repo
import LinkCard, { LinkCardProps } from "@repo/ui/link-card";
import {
  URL_MULTI_DWELLING,
  URL_SINGLE_DWELLING,
} from "@repo/constants/src/urls";
import {
  BUILDING_TYPE_MULTI_DWELLING,
  BUILDING_TYPE_SINGLE_DWELLING,
} from "@repo/constants/src/constants";
import { TESTID_BUILDING_TYPE } from "@repo/constants/src/testids";
// local
import LayoutFooter from "../components/layout-footer/layout-footer";
import "./page.css";

// TODO - HOUSNAV-186
const CARDS: LinkCardProps[] = [
  {
    title: "Single Dwelling Unit",
    description:
      "Includes a house (single detached without a secondary suite), boarding house, or lodging house.",
    href: URL_SINGLE_DWELLING,
    ctaText: "Continue",
    "data-testid": BUILDING_TYPE_SINGLE_DWELLING,
  },
  {
    title: "Multi-Unit Dwelling",
    description:
      "Includes apartments, a house with secondary suite, duplex/triplex/etc., townhouses, row houses, or a hotel.",
    href: URL_MULTI_DWELLING,
    ctaText: "Continue",
    "data-testid": BUILDING_TYPE_MULTI_DWELLING,
  },
  {
    title: "Building Type Analysis",
    description:
      "Not sure? Narrow down whether your project falls under the specifications of a single- or a multi-unit dwelling.",
    href: "",
    ctaText: "Begin",
    ctaVariant: "secondary",
    "data-testid": TESTID_BUILDING_TYPE,
  },
];

export default function Page(): JSX.Element {
  return (
    <LayoutFooter>
      <header className="page-Root--Header u-container-content">
        <Heading level={1}>Code Walkthroughs</Heading>
        <p className="page-Root--Subhead">
          The Ministry of Housing invites you to test our proof of concept
          (tool), designed to provide a guided walk-through experience for code
          users that returns relevant areas of the BC Building Code (BCBC)
          related to individual projects. This initial test focuses on two
          subsections of the 2024 BCBC to evaluate the tool’s functionality:
          Subsection 9.9.9 - Egress From Dwelling Units and Subsection 9.10.14
          1-4 – Spatial Separation Between Buildings.
        </p>
        <p className="page-Root--Subhead">
          Choose one of the cards below to start your journey. During the
          walk-throughs, you will answer questions about your proposed building
          structure to determine the applicable Code requirements. At the end,
          you will have the option to review and download your questions,
          answers, and the relevant BCBC requirements.
        </p>
      </header>
      <div className="page-Root--LinkCards">
        <ul className="u-container-content">
          {CARDS.map((cardProps) => {
            return (
              <li key={cardProps.title}>
                <LinkCard {...cardProps} />
              </li>
            );
          })}
        </ul>
      </div>
    </LayoutFooter>
  );
}
