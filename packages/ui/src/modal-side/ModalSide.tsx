"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";

import { TESTID_MODAL_SIDE } from "@repo/constants/src/testids";
import "./ModalSide.css";
import Icon from "../icon/Icon";
import Button from "../button/Button";
import { parseStringToComponents } from "web/utils/string";
import {
  ModalSideDataEnum,
  ArticleType,
  SubClauseType,
  GlossaryContentType,
  ArticleContentType,
} from "@repo/data/useGlossaryData";
import { DEFINED_TERMS_SECTION_NUMBER } from "@repo/constants/src/constants";

export interface ModalSideProps {
  type:
    | typeof ModalSideDataEnum.GLOSSARY
    | typeof ModalSideDataEnum.BUILDING_CODE;
  triggerContent: ReactNode;
  modalData: ArticleType[];
  scrollTo?: string;
  "data-testid"?: string;
}

function renderDefinitionList(
  definitionList: string[],
  customHandler?: (location: string) => void,
) {
  return (
    <ul className="ui-ModalSide--BuildingCodeList">
      {definitionList.map((item, index) => (
        <li key={index}>{parseStringToComponents(item, customHandler)}</li>
      ))}
    </ul>
  );
}

function renderSubClauses(subClauses: string[]) {
  return (
    <ol type="i" className="ui-ModalSide--BuildingCodeList">
      {subClauses.map((subClause, index) => (
        <li key={index}>{subClause}</li>
      ))}
    </ol>
  );
}

function renderSubsections(subsections: SubClauseType[]) {
  return (
    <ol type="a" className="ui-ModalSide--BuildingCodeList">
      {subsections.map((subsection, index) => (
        <li key={index}>
          {subsection.description}
          {subsection.subClauses && renderSubClauses(subsection.subClauses)}
        </li>
      ))}
    </ol>
  );
}

// TODO: (ANY) Move to GlossaryContent component
function GlossaryContent({
  modalData,
  highlightedSection,
  sectionRefs,
  setFocusSection,
}: {
  modalData: ArticleType[];
  highlightedSection: string | null;
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
  setFocusSection: (section: string) => void;
}) {
  function isGlossaryContentType(
    content: ArticleContentType | GlossaryContentType,
  ): content is GlossaryContentType {
    return (content as GlossaryContentType).definition !== undefined;
  } 
  return (
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
          isGlossaryContentType(data.content) &&
          !data.content?.hideTerm && (
            <section
              key={index}
              ref={(el) => {
                sectionRefs.current[data.section] = el;
              }}
              className={`ui-ModalSide--Section ${
                highlightedSection === data.section
                  ? "ui-ModalSide--SectionHighlighted"
                  : ""
              }`}
            >
              <article className="ui-ModalSide--SectionGlossaryContentLine">
                <p className="ui-ModalSide--SectionContent">
                  {parseStringToComponents(
                    (data.content as GlossaryContentType).definition,
                    setFocusSection,
                  )}
                </p>
                <div className="ui-ModalSide--SectionContent">
                  {data.content.definitionList &&
                    renderDefinitionList(
                      data.content?.definitionList,
                      setFocusSection,
                    )}
                </div>
              </article>
            </section>
          ),
      )}
    </>
  );
}

// TODO: (ANY) Move to BuildingCodeContent component
function BuildingCodeContent({
  modalData,
  highlightedSection,
  sectionRefs,
  setFocusSection,
}: {
  modalData: ArticleType[];
  highlightedSection: string | null;
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
  setFocusSection: (section: string) => void;
}) {
  return (
    <>
      {modalData.map((data, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionRefs.current[data.section] = el;
          }}
          className={`ui-ModalSide--Section ${
            highlightedSection === data.section
              ? "ui-ModalSide--SectionHighlighted"
              : ""
          }`}
        >
          <header className="ui-ModalSide--SectionHeaderLine">
            <Heading level={3} className="ui-ModalSide--SectionNumber">
              {data.section}
            </Heading>
            <Heading className="ui-ModalSide--SectionHeader">
              {data.header}
            </Heading>
          </header>
          <article className="ui-ModalSide--SectionBuildingCodeContentLine">
            {(data.content as ArticleContentType).clauses.map(
              (clause, clauseIndex) => (
                <div key={clauseIndex}>
                  <p>
                    {clauseIndex + 1}.{" "}
                    {parseStringToComponents(
                      clause.description,
                      setFocusSection,
                    )}
                  </p>
                  {clause.subsections && renderSubsections(clause.subsections)}
                </div>
              ),
            )}
          </article>
        </section>
      ))}
    </>
  );
}

export default function ModalSide({
  type,
  triggerContent,
  modalData,
  scrollTo,
  "data-testid": testid = TESTID_MODAL_SIDE,
}: ModalSideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusSection, setFocusSection] = useState(scrollTo);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(
    null,
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    if (focusSection && sectionRefs.current[focusSection]) {
      const sectionElement = sectionRefs.current[focusSection];
      sectionElement?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
      setHighlightedSection(focusSection.toLocaleLowerCase());
    }
  }, [isOpen, focusSection]);

  return (
    <DialogTrigger onOpenChange={setIsOpen}>
      {triggerContent}

      <ModalOverlay className="ui-ModalSide--Overlay">
        <Modal
          className="ui-ModalSide--Modal"
          ref={modalRef}
          data-testid={testid}
        >
          <Dialog className="ui-ModalSide--AriaDialog">
            {({ close }) => (
              <>
                <header className="ui-ModalSide--Header">
                  <Button
                    isIconButton
                    variant="tertiary"
                    className="ui-ModalSide--CloseButton"
                    onPress={close}
                    data-testid={`${testid}-close-button`}
                    aria-label="Close modal"
                  >
                    <Icon type="close" />
                  </Button>
                </header>
                <div className="ui-ModalSide--Content">
                  {type === ModalSideDataEnum.GLOSSARY && (
                    <GlossaryContent
                      modalData={modalData}
                      highlightedSection={highlightedSection}
                      sectionRefs={sectionRefs}
                      setFocusSection={setFocusSection}
                    />
                  )}
                  {type === ModalSideDataEnum.BUILDING_CODE && (
                    <BuildingCodeContent
                      modalData={modalData}
                      highlightedSection={highlightedSection}
                      sectionRefs={sectionRefs}
                      setFocusSection={setFocusSection}
                    />
                  )}
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
