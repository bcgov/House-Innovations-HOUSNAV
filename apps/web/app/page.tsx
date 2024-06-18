// 3rd party
import { JSX } from "react";
// repo
import WalkthroughCard from "@repo/ui/walkthrough-card";
import { WalkthroughJSONData } from "@repo/data/useWalkthroughData";

export default function Page(): JSX.Element {
  return (
    <div className="u-container">
      <div>
        {Object.entries(WalkthroughJSONData).map(([id, { info }]) => {
          return (
            <WalkthroughCard key={id} id={id} data={info} walkthroughId={id} />
          );
        })}
      </div>
    </div>
  );
}
