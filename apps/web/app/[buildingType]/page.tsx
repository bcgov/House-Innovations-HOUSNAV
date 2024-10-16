"use client";
// 3rd party
import React, { JSX, useMemo, useState } from "react";
import { Heading } from "react-aria-components";
import { notFound } from "next/navigation";
// repo
import {
  EnumBuildingTypes,
  EnumWalkthroughIds,
} from "@repo/constants/src/constants";
import {
  TEMP_GET_URL_SINGLE_DWELLING_WALKTHROUGH,
  URLS_GET_WALKTHROUGH,
} from "@repo/constants/src/urls";
import useBuildingTypeData from "@repo/data/useBuildingTypeData";
import {
  WalkthroughJSONData,
  WalkthroughJSONInterface,
} from "@repo/data/useWalkthroughsData";
import LinkCard, { LinkCardProps } from "@repo/ui/link-card";
import CheckboxCard from "@repo/ui/checkbox-card";
import Button from "@repo/ui/button";
import Link from "@repo/ui/link";
// local
import LayoutFooter from "../../components/layout-footer/LayoutFooter";
import "../page-landing.css";
import "./page-building-type.css";
import {
  TESTID_BUILD_WIZARD_SELECT_ALL,
  TESTID_BUILD_WIZARD_TOTAL_SELECTED,
  TESTID_BUILD_WIZARD_TOTAL_AVAILABLE,
  TESTID_BUILD_WIZARD_BEGIN_WALKTHROUGH,
} from "@repo/constants/src/testids";

const TEMP_CARDS = Object.entries(
  WalkthroughJSONData[EnumBuildingTypes.SINGLE_DWELLING],
).reduce(
  (acc, [id, { info }]) => ({
    ...acc,
    [id]: {
      title: info.title,
      subtitle: info.subtitle,
      description: info.description,
      href: TEMP_GET_URL_SINGLE_DWELLING_WALKTHROUGH(id),
    },
  }),
  {} as Record<EnumWalkthroughIds, LinkCardProps>,
);

const TEMPSingleDwellingPage = ({ title }: { title: string }) => {
  return (
    <>
      <header className="page-Landing--Header u-container-content">
        <Heading level={1}>{title}</Heading>
        <p>
          Get step-by-step guidance to determine applicable Code requirements
          for your proposed building structure of the 2024 BC Building Code.
        </p>
      </header>
      <div className="page-Landing--LinkCards">
        <ul className="u-container-content">
          {Object.entries(TEMP_CARDS).map(
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
  // state storage for selected walkthroughs
  const [isChecked, setIsChecked] = useState<Record<string, boolean>>({});

  // get buildingType, else show not found content
  let buildingType;
  try {
    buildingType = useBuildingTypeData({ buildingType: params.buildingType });
  } catch (e) {
    notFound();
  }

  // shortcut for single dwelling
  if (params.buildingType === EnumBuildingTypes.SINGLE_DWELLING) {
    return (
      <LayoutFooter>
        <TEMPSingleDwellingPage title={buildingType.title} />
      </LayoutFooter>
    );
  }

  // gather walkthrough data for buildingType
  const walkthroughs = buildingType.walkthroughs.reduce<
    Record<string, WalkthroughJSONInterface>
  >((arr, walkthroughId) => {
    arr[walkthroughId] =
      WalkthroughJSONData[params.buildingType as EnumBuildingTypes][
        walkthroughId as EnumWalkthroughIds
      ];

    return arr;
  }, {});

  // set initial state for isChecked - this will make sure the CheckboxCard components are controlled from the initial render
  if (Object.keys(isChecked).length === 0) {
    const initialState = buildingType.walkthroughs.reduce<
      Record<string, boolean>
    >((state, walkthroughId) => {
      state[walkthroughId] = false;
      return state;
    }, {});
    setIsChecked(initialState);
  }

  // display helpers
  const totalSelected = Object.values(isChecked).filter(Boolean).length;
  const totalWalkthroughs = Object.keys(walkthroughs).length;
  const memoSetAllSelectedObject = useMemo(
    () =>
      buildingType.walkthroughs.reduce<Record<string, boolean>>(
        (state, walkthroughId) => {
          state[walkthroughId] = true;
          return state;
        },
        {},
      ),
    [buildingType.walkthroughs],
  );
  const selectedWalkthroughIds = Object.entries(isChecked).reduce<string[]>(
    (arr, [walkthroughId, isSelected]) => {
      if (isSelected) {
        arr.push(walkthroughId);
      }
      return arr;
    },
    [],
  );

  return (
    <LayoutFooter>
      <div className="page-BuildingType">
        <header className="page-Landing--Header">
          <Heading level={1}>{buildingType.title}</Heading>
          <p>
            <b className="u-bold">Select All</b> to experience the full
            walkthrough. If you’d prefer to focus on a certain topic, choose
            only one subsection.
          </p>
          <p>
            Get step-by-step guidance to determine applicable Code requirements
            for your proposed building structure of the 2024 BC Building Code.
          </p>
        </header>
        <div className="page-BuildingType--Wizard">
          <div className="page-BuildingType--WizardHeader">
            <Button
              variant="link"
              className="--white"
              isDisabled={totalSelected === totalWalkthroughs}
              onPress={() => {
                setIsChecked(memoSetAllSelectedObject);
              }}
              data-testid={TESTID_BUILD_WIZARD_SELECT_ALL}
            >
              Select All
            </Button>
            <p>
              <span data-testid={TESTID_BUILD_WIZARD_TOTAL_SELECTED}>
                {totalSelected}
              </span>{" "}
              out of{" "}
              <span data-testid={TESTID_BUILD_WIZARD_TOTAL_AVAILABLE}>
                {totalWalkthroughs}
              </span>{" "}
              selected
            </p>
          </div>
          <ul>
            {Object.entries(walkthroughs).map(([walkthroughId, { info }]) => (
              <li key={walkthroughId}>
                <CheckboxCard
                  title={info.title}
                  description={info.description}
                  data-testid={walkthroughId}
                  superTitle={info.subtitle}
                  isSelected={isChecked[walkthroughId]}
                  onChange={() => {
                    setIsChecked({
                      ...isChecked,
                      [walkthroughId]: !isChecked[walkthroughId],
                    });
                  }}
                />
              </li>
            ))}
          </ul>
          <Link
            variant="secondary"
            isDisabled={totalSelected === 0}
            showAsButton
            isLargeButton
            href={URLS_GET_WALKTHROUGH(
              params.buildingType,
              selectedWalkthroughIds,
            )}
            data-testid={TESTID_BUILD_WIZARD_BEGIN_WALKTHROUGH}
          >
            Begin Walkthrough
          </Link>
        </div>
      </div>
    </LayoutFooter>
  );
}
