"use client";
// 3rd party
import React, { JSX } from "react";
import { notFound } from "next/navigation";
// repo
import { useBuildingTypeAnalysisData } from "@repo/data/useWalkthroughsData";
// local
import Walkthrough from "../../components/walkthrough/Walkthrough";
import {
  CreateWalkthroughStore,
  WalkthroughStateContext,
} from "../../stores/WalkthroughRootStore";

export default function Page(): JSX.Element {
  // get walkthrough data, else show not found content
  let walkthroughsData;
  try {
    walkthroughsData = useBuildingTypeAnalysisData();
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
