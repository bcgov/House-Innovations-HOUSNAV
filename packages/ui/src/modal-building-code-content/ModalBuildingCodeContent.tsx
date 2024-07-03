"use client";

import {
  ArticleType,
  SubClauseType,
  PartType,
  SentenceType,
  SectionType,
  SubsectionType,
} from "@repo/data/useGlossaryData";
import { Heading } from "react-aria-components";
import { parseStringToComponents } from "web/utils/string";
import Image from "../image/Image";
import "./ModalBuildingCodeContent.css";

interface BuildingCodeContentProps {
  modalData: PartType[];
  highlightedSection: string | null;
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
  setFocusSection: (section: string) => void;
}

const BuildingCodeContent: React.FC<BuildingCodeContentProps> = ({
  modalData,
  highlightedSection,
  sectionRefs,
  setFocusSection,
}) => {
  const renderSubClauses = (subClauses: string[]) => {
    return (
      <ol type="i" className="ui-ModalBuildingCodeContent--List">
        {subClauses.map((subClause, index) => (
          <li key={index}>
            <span>{parseStringToComponents(subClause, setFocusSection)}</span>
          </li>
        ))}
      </ol>
    );
  };

  const renderClauses = (clauses: SubClauseType[]) => {
    return (
      <ol type="a" className="ui-ModalBuildingCodeContent--List">
        {clauses.map((data, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[data.numberReference] = el;
            }}
            className={`ui-ModalSide--Section ${
              highlightedSection === data.numberReference
                ? "ui-ModalSide--SectionHighlighted ui-ModalSide--SectionHighlightedPadding"
                : ""
            }`}
          >
            <li key={index}>
              <span>
                {parseStringToComponents(data.description, setFocusSection)}
              </span>
              {data.subClauses && renderSubClauses(data.subClauses)}
            </li>
          </section>
        ))}
      </ol>
    );
  };

  const renderParts = (parts: PartType[]) => {
    return (
      (!!parts &&
        parts.map((data, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[data.numberReference] = el;
            }}
            className={`ui-ModalSide--Section ${
              highlightedSection === data.numberReference
                ? "ui-ModalSide--SectionHighlighted"
                : ""
            }`}
          >
            {/* Designs do not show this high level of headings. */}
            {data.sections && renderSections(data.sections)}
          </section>
        ))) ??
      null
    );
  };

  const renderSections = (sections: SectionType[]) => {
    return (
      (!!sections &&
        sections.map((data, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[data.numberReference] = el;
            }}
            className={`ui-ModalSide--Section ${
              highlightedSection === data.numberReference
                ? "ui-ModalSide--SectionHighlighted"
                : ""
            }`}
          >
            {/* Designs do not show this high level of headings. */}
            {data.subsections && renderSubSections(data.subsections)}
          </section>
        ))) ??
      null
    );
  };

  const renderSubSections = (subSections: SubsectionType[]) => {
    return (
      (!!subSections &&
        subSections.map((data, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[data.numberReference] = el;
            }}
            className={`ui-ModalSide--Section ${
              highlightedSection === data.numberReference
                ? "ui-ModalSide--SectionHighlighted"
                : ""
            }`}
          >
            <header className="ui-ModalSide--SectionHeaderLine">
              <Heading className="ui-ModalSide--SectionHeaderLarge">
                <span className="ui-ModalSide--SectionNumberLarge">
                  {data.numberReference}
                </span>
                {data.title}
              </Heading>
            </header>
            {data.articles && renderArticles(data.articles)}
          </section>
        ))) ??
      null
    );
  };

  const renderArticles = (articles: ArticleType[]) => {
    return (
      (!!articles &&
        articles.map((data, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[data.numberReference] = el;
            }}
            className={`ui-ModalSide--Section ${
              highlightedSection === data.numberReference
                ? "ui-ModalSide--SectionHighlighted"
                : ""
            }`}
          >
            <header className="ui-ModalSide--SectionHeaderLine">
              <Heading className="ui-ModalSide--SectionHeader">
                <span className="ui-ModalSide--SectionNumber">
                  {data.numberReference}
                </span>
                {data.title}
              </Heading>
            </header>
            {data.sentences && renderSentences(data.sentences)}
          </section>
        ))) ??
      null
    );
  };

  const renderSentences = (sentences: SentenceType[]) => {
    return (
      <article className="ui-ModalBuildingCodeContent--SectionLine">
        <div className="ui-ModalSide--SectionContent">
          <ol type="1">
            {sentences.map((sentence, index) => (
              <section
                key={index}
                ref={(el) => {
                  sectionRefs.current[sentence.numberReference] = el;
                }}
                className={`ui-ModalSide--Section ${
                  highlightedSection === sentence.numberReference
                    ? "ui-ModalSide--SectionHighlighted ui-ModalSide--SectionHighlightedPadding"
                    : ""
                }`}
              >
                <li key={index}>
                  {sentence.description && (
                    <span>
                      {parseStringToComponents(
                        sentence.description,
                        setFocusSection,
                      )}
                    </span>
                  )}
                  {sentence.clauses && renderClauses(sentence.clauses)}
                  <span>
                    {sentence.imageFileName && (
                      <Image
                        src={sentence.imageFileName}
                        alt={sentence.imageFileName ?? ""}
                        width={800}
                        height={600}
                        className={"ui-ModalSide-ImageResponsive"}
                      ></Image>
                    )}
                  </span>
                </li>
              </section>
            ))}
          </ol>
        </div>
      </article>
    );
  };

  return <>{renderParts(modalData)}</>;
};

export default BuildingCodeContent;
