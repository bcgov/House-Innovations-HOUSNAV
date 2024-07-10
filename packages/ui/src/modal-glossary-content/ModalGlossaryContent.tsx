"use client";

import React from "react";
import { GlossaryType, GlossaryContentType } from "@repo/data/useGlossaryData";
import { parseStringToComponents } from "web/utils/string";
import { DEFINED_TERMS_SECTION_NUMBER } from "@repo/constants/src/constants";
import { Heading } from "react-aria-components";
import "./ModalGlossaryContent.css";

interface GlossaryContentProps {
  modalData: GlossaryType[];
  highlightedSection: string | null;
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
  setFocusSection: (section: string) => void;
}

function renderDefinitionList(
  definitionList: string[],
  customHandler?: (location: string) => void,
) {
  return (
    <ul className="ui-ModalSide--List">
      {definitionList.map((item, index) => (
        <li key={index}>{parseStringToComponents(item, customHandler)}</li>
      ))}
    </ul>
  );
}

const GlossaryContent: React.FC<GlossaryContentProps> = ({
  modalData,
  highlightedSection,
  sectionRefs,
  setFocusSection,
}) => (
  <>
    <header className="ui-ModalSide--SectionHeaderLine">
      <Heading level={3} className="ui-ModalSide--SectionNumber">
        {DEFINED_TERMS_SECTION_NUMBER}
      </Heading>
      <Heading className="ui-ModalSide--ModalContentHeader">
        Defined Terms
      </Heading>
    </header>
    {modalData.map(
      (data, index) =>
        !data.content?.hideTerm && (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[data.reference] = el;
            }}
            className={`${
              highlightedSection === data.reference
                ? "ui-ModalSide--SectionHighlighted"
                : ""
            }`}
          >
            <article className="ui-ModalGlossaryContent--SectionLine">
              <p className="ui-ModalSide--SectionContent">
                {parseStringToComponents(
                  (data.content as GlossaryContentType).definition,
                  setFocusSection,
                )}
              </p>
              <div className="ui-ModalSide--SectionContent">
                {data.content.definitionList &&
                  renderDefinitionList(
                    data.content.definitionList,
                    setFocusSection,
                  )}
              </div>
            </article>
          </section>
        ),
    )}
  </>
);

export default GlossaryContent;
