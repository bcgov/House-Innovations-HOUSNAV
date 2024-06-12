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

export interface ModalSideProps {
  triggerContent: ReactNode;
  sections: { number: string; header: string; content: string }[];
  scrollToSection?: string;
  "data-testid"?: string;
}

export default function ModalSide({
  triggerContent,
  sections,
  scrollToSection,
  "data-testid": testid = TESTID_MODAL_SIDE,
  ...props
}: ModalSideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusSection, setFocusSection] = useState(scrollToSection);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(
    null
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (focusSection && sectionRefs.current[focusSection]) {
      const sectionElement = sectionRefs.current[focusSection];
      sectionElement?.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
      setHighlightedSection(focusSection);
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
                <div className="ui-ModalSide--Header">
                  <Button
                    isIconButton
                    variant="tertiary"
                    className="ui-ModalSide--CloseButton"
                    onPress={close}
                    data-testid={`${testid}-close-button`}
                  >
                    <Icon type="close" />
                  </Button>
                </div>
                <div className="ui-ModalSide--Content">
                  {sections.map((section, index) => (
                    <div
                      key={index}
                      ref={(el) => {
                        sectionRefs.current[section.number] = el;
                      }}
                      className={`ui-ModalSide--Section ${
                        highlightedSection == section.number
                          ? "ui-ModalSide--SectionHighlighted"
                          : ""
                      }`}
                    >
                      <div className="ui-ModalSide--SectionHeaderLine">
                        <Heading
                          level={3}
                          className="ui-ModalSide--SectionNumber"
                        >
                          {section.number}
                        </Heading>
                        <Heading className="ui-ModalSide--SectionHeader">
                          {section.header}
                        </Heading>
                      </div>
                      <div className="ui-ModalSide--SectionContentLine">
                        <p className="ui-ModalSide--SectionContent">
                          {parseStringToComponents(
                            section.content,
                            setFocusSection
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
