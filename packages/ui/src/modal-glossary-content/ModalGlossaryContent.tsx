"use client";

import React from "react";
import {
  GlossaryType,
  GlossaryContentType,
  GlossaryDefinitionListType,
} from "@repo/data/useGlossaryData";
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
  definitionList: GlossaryDefinitionListType[],
  customHandler?: (location: string) => void,
) {
  return (
    <ul className="ui-ModalSide--List">
      {definitionList.map((item, index) => (
        <>
          <li key={index}>
            {parseStringToComponents(item.definition, customHandler)}
          </li>
          {item.definitionList && renderDefinitionList(item.definitionList)}
        </>
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
    <div className="ui-ModalSide--Parts --glossary">
      <article className="ui-ModalSide--Subsection">
        <header className="ui-ModalSide--SectionHeaderLine">
          <Heading level={2} className="ui-ModalSide--SubsectionHeader">
            <span className="ui-ModalSide--SubsectionNumber">
              {DEFINED_TERMS_SECTION_NUMBER}{" "}
            </span>
            Defined Terms
            <Button
              variant="secondary"
              onPress={() => handleDownload()}
              aria-label={`Download Building Code Defined Terms`}
              className="ui-ModalSide-pdfButton"
            >
              <Icon type="download" />
              <span>PDF</span>
            </Button>
          </Heading>
        </header>
        {modalData.map(
          (data, index) =>
            !data.content?.hideTerm && (
              <article
                key={index}
                ref={(el) => {
                  sectionRefs.current[data.reference] = el;
                }}
                className={`ui-ModalSide--Article ${
                  highlightedSection === data.reference
                    ? "ui-ModalSide--SectionHighlighted"
                    : ""
                }`}
              >
                <div className="ui-ModalSide--ArticleContentWrapper">
                  {parseStringToComponents(
                    (data.content as GlossaryContentType).definition,
                    setFocusSection,
                  )}
                  {data.content.definitionList &&
                    renderDefinitionList(
                      data.content.definitionList,
                      setFocusSection,
                    )}
                </div>
              </article>
            ),
        )}
      </article>
    </div>
  );
};

export default GlossaryContent;
