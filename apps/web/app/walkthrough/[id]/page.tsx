"use client";
// 3rd party
import React, { JSX } from "react";
import { notFound } from "next/navigation";
// repo
import useWalkthroughData from "@repo/data/useWalkthroughData";
// local
import Walkthrough from "../../../components/walkthrough/Walkthrough";
import {
  CreateWalkthroughStore,
  WalkthroughStateContext,
} from "../../../stores/WalkthroughRootStore";

export default function Page({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  // get walkthrough data, else show not found content
  let data;
  try {
    data = useWalkthroughData({ id: params.id });
  } catch (e) {
    notFound();
  }

  // create store
  const WalkthroughStore = CreateWalkthroughStore(data);

  return (
    <WalkthroughStateContext.Provider value={WalkthroughStore}>
      <Walkthrough />
    </WalkthroughStateContext.Provider>
  );
}
