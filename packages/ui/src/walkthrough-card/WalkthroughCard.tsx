"use client";

// 3rd party
import {
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import { WalkthroughInfo } from "@repo/data/useWalkthroughData";
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";
import "./WalkthroughCard.css";
import { GET_TESTID_WALKTHROUGH_CARD } from "@repo/constants/src/testids";

export interface WalkthroughCardProps extends ReactAriaLinkProps {
  data: WalkthroughInfo;
  walkthroughId: string;
  "data-testid"?: string;
}

export default function WalkthroughCard({
  data,
  walkthroughId,
  "data-testid": testid = "",
  ...props
}: WalkthroughCardProps) {
  return (
    <ReactAriaLink
      className="ui-WalkthroughCard--CardContainer"
      href={`${URL_WALKTHROUGH_HREF}/${walkthroughId}`}
      aria-label={`walkthrough ${walkthroughId} - ${data.title}`}
      data-testid={GET_TESTID_WALKTHROUGH_CARD(testid || walkthroughId)}
      {...props}
    >
      <article>
        <header className="ui-WalkthroughCard--Title">{data.title}</header>
        <p className="ui-WalkthroughCard--Subtitle">{data.subtitle}</p>
        <p className="ui-WalkthroughCard--Description">{data.description}</p>
      </article>
    </ReactAriaLink>
  );
}
