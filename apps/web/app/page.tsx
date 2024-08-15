"use client";
// 3rd party
import { JSX } from "react";
import { Heading } from "react-aria-components";
// repo
import WalkthroughCard from "@repo/ui/walkthrough-card";
import Footer from "@repo/ui/footer";
import PreFooter from "@repo/ui/pre-footer";
import { WalkthroughJSONData } from "@repo/data/useWalkthroughData";
// local
import "./page.css";

export default function Page(): JSX.Element {
  return (
    <>
      <section className="u-page-background-gray">
        <header className="page-Root--Header u-container-content">
          <Heading level={1}>
            Welcome to the BC Building Code Walk-Through
          </Heading>
          <p className="page-Root--Subhead">
            The Ministry of Housing invites you to test our proof of concept
            (tool), designed to provide a guided walk-through experience for
            code users that returns relevant areas of the BC Building Code
            (BCBC) related to individual projects. This initial test focuses on
            two subsections of the 2024 BCBC to evaluate the tool’s
            functionality.
          </p>
          <p className="page-Root--Subhead">
            Choose one of the cards below to start your journey through each
            subsection. During the walk-through, you will answer questions about
            your proposed building structure to determine the applicable Code
            requirements. At the end, you will have the option to review and
            download your questions, answers, and the relevant BCBC
            requirements.
          </p>
        </header>
        <div className="page-Root--WalkthroughCards">
          <ul className="u-container-content">
            {Object.entries(WalkthroughJSONData).map(([id, { info }]) => {
              return (
                <li key={id}>
                  <WalkthroughCard data={info} walkthroughId={id} />
                </li>
              );
            })}
          </ul>
        </div>
        <PreFooter />
      </section>
      <Footer />
    </>
  );
}
