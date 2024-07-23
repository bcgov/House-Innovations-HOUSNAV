"use client";

import {
  ArticleType,
  SubClauseType,
  PartType,
  SentenceType,
  SectionType,
  SubsectionType,
  ImageModalType,
  AllBuildingCodeTypes,
  findBuildingCodeByNumberReference,
} from "@repo/data/useGlossaryData";
import { Heading } from "react-aria-components";
import {
  parseStringToComponents,
  stripReferencePrefix,
} from "web/utils/string";
import Image from "../image/Image";
import "./ModalBuildingCodeContent.css";
import Icon from "../icon/Icon";
import Button from "../button/Button";
import { useEffect, useState } from "react";

interface BuildingCodeContentProps {
  modalData?: PartType[];
  printData?: AllBuildingCodeTypes;
  highlightedSection?: string | null;
  sectionRefs?: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
  setFocusSection?: (section: string) => void;
}

const BuildingCodeContent: React.FC<BuildingCodeContentProps> = ({
  modalData,
  printData,
  highlightedSection = null,
  sectionRefs = { current: {} },
  setFocusSection,
}) => {
  const [printReference, setPrintReference] = useState<string | null>(null);

  useEffect(() => {
    if (printReference) {
      window.print();
    }
  }, [printReference]);

  const handleDownload = (numberReference: string) => {
    if (printReference == numberReference) {
      window.print();
    } else {
      setPrintReference(numberReference);
    }
  };

  const renderSubClauses = (subClauses: string[]) => {
    return (
      <ol type="i" className="ui-ModalSide--List">
        {subClauses.map((subClause, index) => (
          <li key={index} className="ui-ModalSide--ListItems">
            <span>{parseStringToComponents(subClause, setFocusSection)}</span>
          </li>
        ))}
      </ol>
    );
  };

  const renderClauses = (clauses: SubClauseType[]) => {
    return (
      <ol type="a" className="ui-ModalSide--List">
        {clauses.map((data, index) => (
          <li
            key={index}
            ref={(el) => {
              sectionRefs.current[data.numberReference] = el;
            }}
            className={`ui-ModalSide--ListItems ${
              highlightedSection === data.numberReference
                ? "ui-ModalSide--SectionHighlighted ui-ModalSide--SectionHighlightedPadding"
                : ""
            }`}
          >
            <span>
              {parseStringToComponents(data.description, setFocusSection)}
            </span>
            {data.subClauses && renderSubClauses(data.subClauses)}
          </li>
        ))}
      </ol>
    );
  };

  const renderParts = (parts: PartType[]) => {
    return (
      (!!parts &&
        parts.map((data, index) => (
          <div
            key={index}
            ref={(el) => {
              sectionRefs.current[data.numberReference] = el;
            }}
            className={`ui-ModalSide--parts ${
              highlightedSection === data.numberReference
                ? "ui-ModalSide--SectionHighlighted"
                : ""
            }`}
          >
            {/* Designs do not show this high level of headings. */}
            {data.sections && renderSections(data.sections)}
          </div>
        ))) ??
      null
    );
  };

  const renderSections = (sections: SectionType[]) => {
    return (
      (!!sections &&
        sections.map((data, index) => (
          <div
            key={index}
            ref={(el) => {
              sectionRefs.current[data.numberReference] = el;
            }}
            className={`${
              highlightedSection === data.numberReference
                ? "ui-ModalSide--SectionHighlighted"
                : ""
            }`}
          >
            {/* Designs do not show this high level of headings. */}
            {data.subsections && renderSubSections(data.subsections)}
          </div>
        ))) ??
      null
    );
  };

  const renderSubSections = (subSections: SubsectionType[]) => {
    return (
      (!!subSections &&
        subSections.map((data, index) => (
          <article
            key={index}
            ref={(el) => {
              sectionRefs.current[data.numberReference] = el;
            }}
            className={`${
              highlightedSection === data.numberReference
                ? "ui-ModalSide--SectionHighlighted"
                : ""
            }`}
          >
            <header className="ui-ModalSide--SectionHeaderLine">
              <Heading className="ui-ModalSide--SectionHeaderLarge">
                <span className="ui-ModalSide--SectionNumberLarge">
                  {stripReferencePrefix(data.numberReference)}
                </span>
                {data.title}
                {!printData && (
                  <Button
                    variant="secondary"
                    onPress={() => handleDownload(data.numberReference)}
                    aria-label={`Download Building Code Subsection ${stripReferencePrefix(data.numberReference)} ${data.title}`}
                    className="ui-ModalSide-pdfButton"
                  >
                    <Icon type="download" />
                    <span>PDF</span>
                  </Button>
                )}
              </Heading>
            </header>
            {data.articles && renderArticles(data.articles)}
          </article>
        ))) ??
      null
    );
  };

  const renderArticles = (articles: ArticleType[]) => {
    return (
      (!!articles &&
        articles.map((data, index) => (
          <article
            key={index}
            ref={(el) => {
              sectionRefs.current[data.numberReference] = el;
            }}
            className={`${
              highlightedSection === data.numberReference
                ? "ui-ModalSide--SectionHighlighted"
                : ""
            }`}
          >
            <header className="ui-ModalSide--SectionHeaderLine">
              <Heading className="ui-ModalSide--SectionHeader">
                <span className="ui-ModalSide--SectionNumber">
                  {stripReferencePrefix(data.numberReference)}
                </span>
                {data.title}
              </Heading>
            </header>
            {data.sentences && renderSentences(data.sentences)}
          </article>
        ))) ??
      null
    );
  };

  const renderSentences = (sentences: SentenceType[]) => {
    return (
      <div className="ui-ModalBuildingCodeContent--SectionLine">
        <div className="ui-ModalSide--SectionContent">
          <ol type="1">
            {sentences.map((sentence, index) => (
              <li
                key={index}
                ref={(el) => {
                  sectionRefs.current[sentence.numberReference] = el;
                }}
                className={`${
                  highlightedSection === sentence.numberReference
                    ? "ui-ModalSide--SectionHighlighted ui-ModalSide--SectionHighlightedPadding"
                    : ""
                }`}
              >
                {sentence.description && (
                  <span>
                    {parseStringToComponents(
                      sentence.description,
                      setFocusSection,
                    )}
                  </span>
                )}
                {sentence.clauses && renderClauses(sentence.clauses)}
                {sentence.image && renderTableImage(sentence.image)}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  };

  const renderTableImage = (image: ImageModalType) => {
    return (
      image && (
        <section
          key={image.numberReference}
          ref={(el) => {
            sectionRefs.current[image.numberReference] = el;
          }}
          className={`${
            highlightedSection === image.numberReference
              ? "ui-ModalSide--SectionHighlighted ui-ModalSide--SectionHighlightedPadding"
              : ""
          }`}
        >
          <figure className="ui-ModalBuildingCodeContent--Figure">
            <figcaption>
              <div className="ui-ModalBuildingCodeContent--FigureCaptionBold">
                {image.tableName}
              </div>
              <div className="ui-ModalBuildingCodeContent--FigureCaptionBold">
                {parseStringToComponents(image.title)}
              </div>
              <div className="ui-ModalBuildingCodeContent--FigureCaption">
                {parseStringToComponents(image.imageReference, setFocusSection)}
              </div>
            </figcaption>
            <Image
              src={image.fileName}
              alt={image.title}
              aria-label={image.imageLabel}
              width={800}
              height={600}
              loading="eager" // Will not lazy load images in Safari
              className="ui-ModalBuildingCodeContent-ImageResponsive"
            />
            {image.imageNotes && (
              <section className="ui-ModalBuildingCodeContent--TableImageNotes">
                <header className="ui-ModalBuildingCodeContent--FigureCaptionBold">
                  Notes to {image.tableName}:
                </header>
                {parseStringToComponents(image.imageNotes, setFocusSection)}
              </section>
            )}
          </figure>
        </section>
      )
    );
  };

  const renderBuildingCodePdf = () => {
    if (!printReference) return null;
    const data = findBuildingCodeByNumberReference(printReference);
    return (
      data &&
      "articles" in data && (
        <>
          <div className="ui-ModalBuildingCodeContent--printContainer">
            <h5 className="ui-ModalBuildingCodeContent--buildingCodeTitle">
              {stripReferencePrefix(data.numberReference) + " " + data.title}
            </h5>
            <table className="ui-ModalBuildingCodeContent--modalTable">
              <tbody>
                <tr>
                  <td>{renderArticles(data.articles)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )
    );
  };

  // Render logic for printData
  const renderPrintData = () => {
    if (!printData) return null;
    if ("sentences" in printData) return renderSentences(printData.sentences);
    if ("articles" in printData) return renderArticles(printData.articles);
    if ("subsections" in printData)
      return renderSubSections(printData.subsections);
    if ("sections" in printData) return renderSections(printData.sections);
    return null;
  };

  return (
    <>
      {!printData && modalData && renderParts(modalData)}
      {printData && renderPrintData()}
      {printReference && renderBuildingCodePdf()}
    </>
  );
};

export default BuildingCodeContent;
