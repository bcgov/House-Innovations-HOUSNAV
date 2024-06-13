// 3rd party
import { JSX } from "react";
// repo
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";
import WalkthroughCard from "@repo/ui/walkthrough-card";
import { WalkthroughJSONData } from "../../../packages/data/src/useWalkthroughData";

export default function Page(): JSX.Element {
  return (
    <div className="u-container">
      <div>
        {Object.entries(WalkthroughJSONData).map(([id, { info }]) => {
          return (
            <WalkthroughCard
              id={id}
              data={info}
              href={`${URL_WALKTHROUGH_HREF}/${id}/`}
            />
          );
        })}
      </div>
    </div>
  );
}
