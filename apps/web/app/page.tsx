"use client";
// 3rd party
import React, { JSX } from "react";
import { Heading } from "react-aria-components";
// repo
import LinkCard, { LinkCardProps } from "@repo/ui/link-card";
import {
  URL_BUILDING_TYPE_HREF,
  URLS_GET_BUILDING_TYPE,
} from "@repo/constants/src/urls";
import { EnumBuildingTypes } from "@repo/constants/src/constants";
import { TESTID_BUILDING_TYPE } from "@repo/constants/src/testids";
// local
import LayoutFooter from "../components/layout-footer/LayoutFooter";
import "./page-landing.css";
import { BuildingTypeAnalysisJSONData } from "@repo/data/useWalkthroughData";
import { BuildingTypeJSONData } from "@repo/data/useBuildingTypeData";

const CARDS: LinkCardProps[] = [
  {
    title: BuildingTypeJSONData[EnumBuildingTypes.SINGLE_DWELLING].title,
    description:
      BuildingTypeJSONData[EnumBuildingTypes.SINGLE_DWELLING].description,
    href: URLS_GET_BUILDING_TYPE(EnumBuildingTypes.SINGLE_DWELLING),
    ctaText: "Continue",
    "data-testid": EnumBuildingTypes.SINGLE_DWELLING,
  },
  {
    title: BuildingTypeJSONData[EnumBuildingTypes.MULTI_DWELLING].title,
    description:
      BuildingTypeJSONData[EnumBuildingTypes.MULTI_DWELLING].description,
    href: URLS_GET_BUILDING_TYPE(EnumBuildingTypes.MULTI_DWELLING),
    ctaText: "Continue",
    "data-testid": EnumBuildingTypes.MULTI_DWELLING,
  },
  {
    title: BuildingTypeAnalysisJSONData.info.title,
    description: BuildingTypeAnalysisJSONData.info.description,
    href: URL_BUILDING_TYPE_HREF,
    ctaText: "Begin",
    ctaVariant: "secondary",
    "data-testid": TESTID_BUILDING_TYPE,
  },
];

export default function Page(): JSX.Element {
  return (
    <LayoutFooter>
      <header className="page-Landing--Header u-container-content">
        <Heading level={1}>Code Walkthroughs</Heading>
        <p>
          The Ministry of Housing invites you to test our proof of concept
          (tool), designed to provide a guided walk-through experience for code
          users that returns relevant areas of the BC Building Code (BCBC)
          related to individual projects. This initial test focuses on two
          subsections of the 2024 BCBC to evaluate the tool’s functionality:{" "}
          <cite className="u-italic">
            Subsection 9.9.9 - Egress From Dwelling Units
          </cite>{" "}
          and{" "}
          <cite className="u-italic">
            Subsection 9.10.14 1-4 – Spatial Separation Between Buildings
          </cite>
          .
        </p>
        <p>
          Choose one of the cards below to start your journey. During the
          walk-throughs, you will answer questions about your proposed building
          structure to determine the applicable Code requirements. At the end,
          you will have the option to review and download your questions,
          answers, and the relevant BCBC requirements.
        </p>
      </header>
      <div className="page-Landing--LinkCards">
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
