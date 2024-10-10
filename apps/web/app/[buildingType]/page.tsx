"use client";
// 3rd party
import React, { JSX, useState } from "react";
import { Heading } from "react-aria-components";
import { notFound } from "next/navigation";
// repo
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import { URLS_WALKTHROUGHS } from "@repo/constants/src/urls";
import useBuildingTypeData from "@repo/data/useBuildingTypeData";
import { WalkthroughJSONData } from "@repo/data/useWalkthroughData";
import LinkCard, { LinkCardProps } from "@repo/ui/link-card";
import CheckboxCard from "@repo/ui/checkbox-card";
// local
import LayoutFooter from "../../components/layout-footer/LayoutFooter";
import "../page-landing.css";

const CARDS = Object.entries(
  WalkthroughJSONData[EnumBuildingTypes.SINGLE_DWELLING],
).reduce(
  (acc, [id, { info }]) => ({
    ...acc,
    [id]: {
      title: info.title,
      subtitle: info.subtitle,
      description: info.description,
      href: URLS_WALKTHROUGHS[EnumBuildingTypes.SINGLE_DWELLING][
        id as EnumWalkthroughIds
      ].href,
    },
  }),
  {} as Record<EnumWalkthroughIds, LinkCardProps>,
);

const TEMPSingleDwellingPage = () => {
  return (
    <>
      <header className="page-Landing--Header u-container-content">
        <Heading level={1}>Single Dwelling Unit</Heading>
        <p className="page-Landing--Subhead">
          Get step-by-step guidance to determine applicable Code requirements
          for your proposed building structure of the 2024 BC Building Code.
        </p>
      </header>
      <div className="page-Landing--LinkCards">
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
                    href={href}
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
  const [isChecked, setIsChecked] = useState({ 0: false, 1: false });
  // get buildingType, else show not found content
  let buildingType;
  try {
    buildingType = useBuildingTypeData({ buildingType: params.buildingType });
  } catch (e) {
    notFound();
  }

  const title = buildingType.title;

  return (
    <LayoutFooter>
      {params.buildingType === EnumBuildingTypes.SINGLE_DWELLING ? (
        <TEMPSingleDwellingPage />
      ) : (
        <div className="u-container TEMP-multi-dwelling">
          <header>
            <Heading level={1}>{title}</Heading>
          </header>
          <CheckboxCard
            title={"Egress from Dwelling Units"}
            description={
              "Location and distances of exists from living spaces in a building."
            }
            data-testid={EnumWalkthroughIds._9_9_9}
            superTitle={"Volume II - 9.9.9."}
            onChange={() => setIsChecked({ 0: !isChecked[0], 1: isChecked[1] })}
            isSelected={isChecked[0]}
          />
          <CheckboxCard
            title={"Spatial Separation Between Buildings"}
            description={
              "Calculations for size and number of doors and windows in a wall facing another building."
            }
            data-testid={EnumWalkthroughIds._9_10_14}
            superTitle={"Volume II - 9.10.14."}
            onChange={() => setIsChecked({ 0: isChecked[0], 1: !isChecked[1] })}
            isSelected={isChecked[1]}
          />
        </div>
      )}
    </LayoutFooter>
  );
}
