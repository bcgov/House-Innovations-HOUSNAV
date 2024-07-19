"use client";

import React from "react";
import { GlossaryType, GlossaryContentType } from "@repo/data/useGlossaryData";
import { parseStringToComponents } from "web/utils/string";
import { DEFINED_TERMS_SECTION_NUMBER } from "@repo/constants/src/constants";
import { Heading } from "react-aria-components";
import "./ModalGlossaryContent.css";
import Icon from "../icon/Icon";
import Button from "../button/Button";

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
}) => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <header className="ui-ModalSide--SectionHeaderLineGlossary">
        <Heading level={3} className="ui-ModalSide--SectionNumber">
          {DEFINED_TERMS_SECTION_NUMBER}
        </Heading>
        <Heading className="ui-ModalSide--ModalContentHeader">
          Defined Terms
        </Heading>
        <Button
          variant="secondary"
          onPress={() => handleDownload()}
          aria-label={`Download Building Code Defined Terms`}
          className="ui-ModalSide-pdfButtonGlossary"
        >
          <Icon type="download" />
          <span>PDF</span>
        </Button>
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
};

export default GlossaryContent;
