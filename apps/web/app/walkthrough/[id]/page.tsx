// 3rd party
import { JSX } from "react";
import { notFound } from "next/navigation";
// repo
import Link from "@repo/ui/link";
import useWalkthroughData from "@repo/data/useWalkthroughData";
// local
import Walkthrough from "../../../components/walkthrough/Walkthrough";

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

  return (
    <div>
      <div className="container">
        <Link href="/">Back home</Link>
      </div>
      <Walkthrough
        walkthroughData={data}
        startingQuestionId={data.info.startingQuestionId}
      />
    </div>
  );
}
