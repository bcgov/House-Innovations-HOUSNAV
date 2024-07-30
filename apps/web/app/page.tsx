"use client";
// 3rd party
import { JSX } from "react";
import { Heading } from "react-aria-components";
// repo
import WalkthroughCard from "@repo/ui/walkthrough-card";
import Footer from "@repo/ui/footer";
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
        <aside className="page-Root--PreFooter">
          <p className="u-container">
            The B.C. Public Service acknowledges the territories of First
            Nations around B.C. and is grateful to carry out our work on these
            lands. We acknowledge the rights, interests, priorities, and
            concerns of all Indigenous Peoples - First Nations, Métis, and Inuit
            - respecting and acknowledging their distinct cultures, histories,
            rights, laws, and governments.
          </p>
        </aside>
      </section>
      <Footer />
    </>
  );
}
