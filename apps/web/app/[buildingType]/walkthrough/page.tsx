"use client";
// 3rd party
import React, { JSX } from "react";
import { notFound } from "next/navigation";
// repo
import useWalkthroughsData from "@repo/data/useWalkthroughsData";
import {
  SEARCH_PARAM_WALKTHROUGH_ID,
  SEARCH_PARAM_WALKTHROUGH_ID_SEPARATOR,
} from "@repo/constants/src/urls";
// local
import Walkthrough from "../../../components/walkthrough/Walkthrough";
import {
  CreateWalkthroughStore,
  WalkthroughStateContext,
} from "../../../stores/WalkthroughRootStore";

export default function Page({
  params,
  searchParams,
}: {
  params: { buildingType: string };
  searchParams: { [SEARCH_PARAM_WALKTHROUGH_ID]: string };
}): JSX.Element {
  // get walkthrough data, else show not found content
  let walkthroughsData;
  try {
    walkthroughsData = useWalkthroughsData({
      wtIds: searchParams[SEARCH_PARAM_WALKTHROUGH_ID].split(
        SEARCH_PARAM_WALKTHROUGH_ID_SEPARATOR,
      ),
      buildingType: params.buildingType,
    });
  } catch (e) {
    notFound();
  }

  // create store
  const WalkthroughStore = CreateWalkthroughStore(walkthroughsData);

  return (
    <WalkthroughStateContext.Provider value={WalkthroughStore}>
      <Walkthrough />
    </WalkthroughStateContext.Provider>
  );
}
