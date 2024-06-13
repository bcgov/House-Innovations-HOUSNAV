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
    <div className="u-container">
      <div>
        {Object.entries(WalkthroughJSONData).map(([id, data]) => {
          const info = data.info;
          const canDisplayCard =
            info && info.title && info.subtitle && info.description;
          return (
            canDisplayCard && (
              <WalkthroughCard
                key={id}
                id={id}
                data={info}
                href={`${URL_WALKTHROUGH_HREF}/${id}/`}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
