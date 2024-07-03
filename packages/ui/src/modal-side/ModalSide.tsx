"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";

import { TESTID_MODAL_SIDE } from "@repo/constants/src/testids";
import "./ModalSide.css";
import Icon from "../icon/Icon";
import Button from "../button/Button";

import { ModalSideDataEnum, StaticData } from "@repo/data/useGlossaryData";
import GlossaryContent from "@repo/ui/modal-glossary-content";
import BuildingCodeContent from "@repo/ui/modal-building-code-content";

export interface ModalSideProps {
  type:
    | typeof ModalSideDataEnum.GLOSSARY
    | typeof ModalSideDataEnum.BUILDING_CODE;
  triggerContent: ReactNode;
  scrollTo?: string;
  "data-testid"?: string;
}

export default function ModalSide({
  type,
  triggerContent,
  scrollTo,
  "data-testid": testid = TESTID_MODAL_SIDE,
}: ModalSideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusSection, setFocusSection] = useState(scrollTo);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(
    null
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

  // Reset focusSection when the modal is closed so that when modal is re-opened, it will scroll to the correct section and not the most recent one
  useEffect(() => {
    if (!isOpen) {
      setFocusSection(scrollTo);
    }
  }, [isOpen, scrollTo]);

  // Ensure that if the user clicks the same focusSection twice in a row, the focusSection is still set and re-centered
  const handleSetFocusSection = (section: string) => {
    // Reset focusSection before setting it to the new section
    setFocusSection(null);
    setTimeout(() => {
      setFocusSection(section);
    }, 0);
  };

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
                      modalData={StaticData[type]}
                      highlightedSection={highlightedSection}
                      sectionRefs={sectionRefs}
                      setFocusSection={handleSetFocusSection}
                    />
                  )}
                  {type === ModalSideDataEnum.BUILDING_CODE && (
                    <BuildingCodeContent
                      modalData={StaticData[type]}
                      highlightedSection={highlightedSection}
                      sectionRefs={sectionRefs}
                      setFocusSection={handleSetFocusSection}
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
