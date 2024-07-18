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
          <Heading level={1}>Code walkthroughs (beta)</Heading>
          <p className="page-Root--Subhead">
            The British Columbia Ministry of Housing is presenting this proof of
            concept (POC) as an initial test of a guided walk-through for two
            key sections of the 2024 BC Building Code which pertain to
            multi-unit dwellings.
          </p>
          <p className="page-Root--Subhead">
            You may choose from the below two cards to be taken through each
            section one at a time. You will be presented with questions about
            your proposed building structure to determine the applicable code
            requirements. At the conclusion of the walk-through you will be
            presented with the option to review and download the questions along
            with your answers and the corresponding building code requirements.
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
