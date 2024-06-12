"use client";
import { useRouter } from "next/navigation";

import { Button } from "react-aria-components";

import { WalkthroughInfo } from "../../../data/src/useWalkthroughData";

import "./WalkthroughCard.css";

export interface WalkthroughCardProps {
  id: string;
  data: WalkthroughInfo;
  href?: string;
}

export default function WalkthroughCard({
  id,
  data,
  href,
}: WalkthroughCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) router.push(href);
  };

  const canDisplayCard =
    data && data.title && data.subtitle && data.description;

  if (!canDisplayCard) return null;

  return (
    <Button
      className="card-container"
      onPress={handleClick}
      aria-label={`${id}-walkthrough-card`}
    >
      <div className="title">{data.title}</div>
      <div>
        <div className="subtitle">{data.subtitle}</div>
      </div>
      <div className="description">{data.description}</div>
    </Button>
  );
}
