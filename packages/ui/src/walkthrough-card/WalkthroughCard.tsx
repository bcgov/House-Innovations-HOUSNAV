"use client";

// 3rd party
import {
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import { WalkthroughInfo } from "@repo/data/useWalkthroughData";
import { URL_WALKTHROUGH_HREF } from "@repo/constants/src/urls";
import "./WalkthroughCard.css";

export interface WalkthroughCardProps extends ReactAriaLinkProps {
  id: string;
  data: WalkthroughInfo;
  walkthroughId: string;
}

export default function WalkthroughCard({
  id,
  data,
  walkthroughId,
}: WalkthroughCardProps) {
  return (
    <ReactAriaLink
      className="ui-WalkthroughCard--CardContainer"
      href={`${URL_WALKTHROUGH_HREF}/${walkthroughId}`}
      aria-label={`${id}-walkthrough-card`}
    >
      <article>
        <header className="ui-WalkthroughCard--Title">{data.title}</header>
        <span className="ui-WalkthroughCard--Subtitle">{data.subtitle}</span>
        <section className="ui-WalkthroughCard--Description">
          {data.description}
        </section>
      </article>
    </ReactAriaLink>
  );
}
