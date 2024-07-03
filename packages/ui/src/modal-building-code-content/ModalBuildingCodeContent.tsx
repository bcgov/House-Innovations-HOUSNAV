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

function renderSubClauses(
  subClauses: string[],
  customHandler?: (location: string) => void,
) {
  return (
    <ol type="i" className="ui-ModalBuildingCodeContent--List">
      {subClauses.map((subClause, index) => (
        <li key={index}>
          <p>{parseStringToComponents(subClause, customHandler)}</p>
        </li>
      ))}
    </ol>
  );
}

function renderClauses(
  clauses: SubClauseType[],
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>,
  highlightedSection: string | null,
  customHandler?: (location: string) => void,
) {
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
            <p>{parseStringToComponents(data.description, customHandler)}</p>
            {data.subClauses &&
              renderSubClauses(data.subClauses, customHandler)}
          </li>
        </section>
      ))}
    </ol>
  );
}

function renderParts(
  parts: PartType[],
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>,
  highlightedSection: string | null,
  customHandler?: (location: string) => void,
) {
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
          {data.sections &&
            renderSections(
              data.sections,
              sectionRefs,
              highlightedSection,
              customHandler,
            )}
        </section>
      ))) ??
    null
  );
}

function renderSections(
  sections: SectionType[],
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>,
  highlightedSection: string | null,
  customHandler?: (location: string) => void,
) {
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
          {data.subsections &&
            renderSubSections(
              data.subsections,
              sectionRefs,
              highlightedSection,
              customHandler,
            )}
        </section>
      ))) ??
    null
  );
}

function renderSubSections(
  subSections: SubsectionType[],
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>,
  highlightedSection: string | null,
  customHandler?: (location: string) => void,
) {
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
            <Heading className="ui-ModalSide--SectionNumberLarge">
              {data.numberReference}
            </Heading>
            <Heading className="ui-ModalSide--SectionHeaderLarge">
              {data.title}
            </Heading>
          </header>
          {data.articles &&
            renderArticles(
              data.articles,
              sectionRefs,
              highlightedSection,
              customHandler,
            )}
        </section>
      ))) ??
    null
  );
}

function renderArticles(
  articles: ArticleType[],
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>,
  highlightedSection: string | null,
  customHandler?: (location: string) => void,
) {
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
            <Heading className="ui-ModalSide--SectionNumber">
              {data.numberReference}
            </Heading>
            <Heading className="ui-ModalSide--SectionHeader">
              {data.title}
            </Heading>
          </header>
          {data.sentences &&
            renderSentences(
              data.sentences,
              sectionRefs,
              highlightedSection,
              customHandler,
            )}
        </section>
      ))) ??
    null
  );
}

function renderSentences(
  sentences: SentenceType[],
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>,
  highlightedSection: string | null,
  customHandler?: (location: string) => void,
) {
  return (
    <article className="ui-ModalBuildingCodeContent--SectionLine">
      <p className="ui-ModalSide--SectionContent">
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
                  <p>
                    {parseStringToComponents(
                      sentence.description,
                      customHandler,
                    )}
                  </p>
                )}
                {sentence.clauses &&
                  renderClauses(
                    sentence.clauses,
                    sectionRefs,
                    highlightedSection,
                    customHandler,
                  )}
                <span>
                  {sentence.imageFileName && (
                    <Image
                      src={sentence.imageFileName}
                      alt={sentence.imageFileName ?? ""}
                      width={800}
                      height={600}
                      className={".ui-ModalSide-ImageResponsive"}
                    ></Image>
                  )}
                </span>
              </li>
            </section>
          ))}
        </ol>
      </p>
    </article>
  );
}

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
}) => (
  <>
    {renderParts(modalData, sectionRefs, highlightedSection, setFocusSection)}
  </>
);

export default BuildingCodeContent;
