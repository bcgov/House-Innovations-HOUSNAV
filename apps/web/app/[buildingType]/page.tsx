"use client";
// 3rd party
import React, { JSX } from "react";
import { Heading } from "react-aria-components";
import { notFound } from "next/navigation";
// repo
import { BUILDING_TYPE_SINGLE_DWELLING } from "@repo/constants/src/constants";
import { URL_SINGLE_DWELLING } from "@repo/constants/src/urls";
import useBuildingTypeData from "@repo/data/useBuildingTypeData";
import {
  WalkthroughJSONData,
  Walkthroughs,
} from "@repo/data/useWalkthroughData";
import LinkCard, { LinkCardProps } from "@repo/ui/link-card";
// local
import LayoutFooter from "../../components/layout-footer/layout-footer";
import "../page.css";

const CARDS: Record<Walkthroughs, LinkCardProps> = {
  "9.9.9": {
    title: WalkthroughJSONData["9.9.9"].info.title,
    subtitle: WalkthroughJSONData["9.9.9"].info.subtitle,
    description: WalkthroughJSONData["9.9.9"].info.description,
    href: URL_SINGLE_DWELLING,
  },
  "9.10.14": {
    title: WalkthroughJSONData["9.10.14"].info.title,
    subtitle: WalkthroughJSONData["9.10.14"].info.subtitle,
    description: WalkthroughJSONData["9.10.14"].info.description,
    href: URL_SINGLE_DWELLING,
  },
};

const TEMPSingleDwellingPage = () => {
  return (
    <>
      <header className="page-Root--Header u-container-content">
        <Heading level={1}>Single Dwelling Unit</Heading>
        <p className="page-Root--Subhead">
          Get step-by-step guidance to determine applicable Code requirements
          for your proposed building structure of the 2024 BC Building Code.
        </p>
      </header>
      <div className="page-Root--LinkCards">
        <ul className="u-container-content">
          {Object.entries(CARDS).map(
            ([id, { title, description, subtitle, href }]) => {
              return (
                <li key={id}>
                  <LinkCard
                    title={title}
                    description={description}
                    subtitle={subtitle}
                    aria-label={`walkthrough ${id} - ${title} - ${description}`}
                    data-testid={id}
                    href={`${href}/${id}`}
                  />
                </li>
              );
            },
          )}
        </ul>
      </div>
    </>
  );
};

export default function Page({
  params,
}: {
  params: { buildingType: string };
}): JSX.Element {
  // get buildingType, else show not found content
  let buildingType;
  try {
    buildingType = useBuildingTypeData({ buildingType: params.buildingType });
  } catch (e) {
    notFound();
  }

  const name = buildingType.name;

  return (
    <LayoutFooter>
      {params.buildingType === BUILDING_TYPE_SINGLE_DWELLING ? (
        <TEMPSingleDwellingPage />
      ) : (
        <>{name}</>
      )}
    </LayoutFooter>
  );
}
