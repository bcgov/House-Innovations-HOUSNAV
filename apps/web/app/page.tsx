// 3rd party
import { JSX } from "react";
// repo
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";
import WalkthroughCard from "@repo/ui/walkthrough-card";
import {
  Walkthroughs,
  WalkthroughJSONData,
} from "../../../packages/data/src/useWalkthroughData";

export default function Page(): JSX.Element {
  return (
    <div className="u-container ">
      {Walkthroughs.map((walkthrough: string) => {
        const data = WalkthroughJSONData[walkthrough]?.info;
        const canDisplayCard =
          data && data.title && data.subtitle && data.description;
        return (
          canDisplayCard && (
            <WalkthroughCard
              id={walkthrough}
              data={data}
              href={`${URL_WALKTHROUGH_HREF}/${walkthrough}/`}
            />
          )
        );
      })}
    </div>
  );
}
