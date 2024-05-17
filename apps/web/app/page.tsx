"use client";
// 3rd party
import { JSX } from "react";
// repo
import Link from "@repo/ui/link";

export default function Page(): JSX.Element {
  return (
    <div className="container">
      <p>
        <Link href="/walkthrough/9.9.9/">Walkthrough 9.9.9</Link>
      </p>
    </div>
  );
}
