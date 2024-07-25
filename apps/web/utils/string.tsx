// 3rd party
import React, { FunctionComponent, ReactNode, JSX } from "react";
import parse, {
  DOMNode,
  Element,
  domToReact,
  attributesToProps,
} from "html-react-parser";
import { Heading } from "react-aria-components";
// repo
import Button from "@repo/ui/button";
import Tooltip from "@repo/ui/tooltip";
import {
  ModalSideDataEnum,
  TooltipGlossaryData,
} from "@repo/data/useGlossaryData";
import ModalSide from "@repo/ui/modal-side";
import {
  ANSWER_DISPLAY_VALUE_PLACEHOLDER,
  ANSWER_DISPLAY_VALUE_PLACEHOLDER_A11Y,
} from "@repo/constants/src/constants";
// local
import DefinedTerm, {
  DefinedTermProps,
} from "../components/defined-term/DefinedTerm";
import PDFDownloadLink, {
  PDFDownloadLinkProps,
} from "../components/pdf-download-link/PDFDownloadLink";
import { useWalkthroughState } from "../stores/WalkthroughRootStore";
import {
  calculateResultDisplayNumber,
  mathRoundToTwoDecimalsIfNeeded,
} from "./calculations";

// Define custom components for html-react-parser
const definedTermName = "defined-term";
const definedTermModal = "defined-term-glossary";
const glossaryTerm = "glossary-term";
const buildingCode = "building-code";
const buildingCodeModal = "building-code-modal";
const pdfDownloadLinkName = "pdf-download-link";
const answerValue = "answer-value";
const resultCalculation = "result-calculation";

type CustomComponentTypes = typeof definedTermName | typeof pdfDownloadLinkName;

type CustomComponentProps<T extends CustomComponentTypes> =
  T extends typeof definedTermName
    ? DefinedTermProps
    : T extends typeof pdfDownloadLinkName
      ? PDFDownloadLinkProps
      : never;

type CustomComponentRecord<T extends CustomComponentTypes> = {
  [K in T]: FunctionComponent<CustomComponentProps<K>>;
};

const customComponents: CustomComponentRecord<CustomComponentTypes> = {
  [definedTermName]: DefinedTerm,
  [pdfDownloadLinkName]: PDFDownloadLink,
};
type CustomHandler = (section: string) => void;

export const parseStringToComponents = (
  html: string,
  customHandler?: CustomHandler,
  ignoreComponentMarkup?: boolean,
) => {
  const options = {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        !ignoreComponentMarkup
      ) {
        const props = attributesToProps(domNode.attribs);
        let term = domToReact(domNode.children as DOMNode[]) as string;
        const termNotLowerCase = term;
        try {
          term = (domNode.attribs["override-term"] ?? term).toLocaleLowerCase();
        } catch (error) {
          // console.warn("Error parsing string", error, domNode.children);
        }
        const tooltipTerm = domNode.attribs["override-tooltip"] ?? term;

        switch (domNode.name) {
          case definedTermName: {
            const DefinedTermComponent = customComponents[definedTermName];

            return (
              <DefinedTermComponent
                {...(props as unknown as DefinedTermProps)}
                key={domNode.attribs.key}
                term={term}
                overrideTooltip={tooltipTerm}
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </DefinedTermComponent>
            );
          }
          case pdfDownloadLinkName: {
            const PDFDownloadLinkComponent =
              customComponents[pdfDownloadLinkName];

            return (
              <PDFDownloadLinkComponent
                {...(props as unknown as PDFDownloadLinkProps)}
                key={domNode.attribs.key}
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </PDFDownloadLinkComponent>
            );
          }

          case definedTermModal:
            return (
              <Tooltip
                tooltipLabel={`Select to focus on ${tooltipTerm}`}
                tooltipContent={TooltipGlossaryData.get(tooltipTerm)}
                triggerContent={
                  <Button
                    variant="glossary"
                    onPress={
                      customHandler ? () => customHandler(term) : () => {}
                    }
                  >
                    {domToReact(domNode.children as DOMNode[])}
                  </Button>
                }
              ></Tooltip>
            );

          case buildingCodeModal:
            return (
              <Button
                variant="glossary"
                onPress={
                  customHandler
                    ? () => customHandler(domNode.attribs["reference"] ?? "")
                    : () => {}
                }
              >
                {domToReact(domNode.children as DOMNode[])}
              </Button>
            );

          case glossaryTerm:
            return (
              <Heading level={3} className="ui-ModalSide--Term">
                {domToReact(domNode.children as DOMNode[]) as string}
              </Heading>
            );

          case buildingCode:
            return (
              <ModalSide
                type={ModalSideDataEnum.BUILDING_CODE}
                triggerContent={
                  <Button variant="code">{termNotLowerCase}</Button>
                }
                scrollTo={domNode.attribs["reference"] ?? ""}
              />
            );

          case answerValue: {
            return getAnswerValueDisplay(
              domNode.attribs["answer"],
              Object.hasOwn(domNode.attribs, "return-markup"),
            );
          }
          case resultCalculation: {
            return getResultCalculation(domNode.attribs["id"]);
          }
        }
      } else if (
        domNode instanceof Element &&
        domNode.attribs &&
        ignoreComponentMarkup
      ) {
        const isComponent =
          !!customComponents[domNode.name as CustomComponentTypes];

        if (isComponent) {
          return <>{domToReact(domNode.children as DOMNode[], options)}</>;
        } else if (domNode.name === answerValue) {
          return getAnswerValueDisplay(domNode.attribs["answer"]);
        }

        return domToReact(domNode.children as DOMNode[], options);
      }
    },
  };
  return parse(html, options);
};

const AnswerDisplayValuePlaceholder = () => (
  <span aria-label={ANSWER_DISPLAY_VALUE_PLACEHOLDER_A11Y}>
    {ANSWER_DISPLAY_VALUE_PLACEHOLDER}
  </span>
);
export const getAnswerValueDisplay = (
  questionId?: string,
  returnMarkup = false,
): string | JSX.Element | JSX.Element[] => {
  if (!questionId) {
    console.warn("Missing question ID - incorrect json data.");
    return <AnswerDisplayValuePlaceholder />;
  }

  const { getQuestionAnswerValueDisplay } = useWalkthroughState();
  const displayValue = getQuestionAnswerValueDisplay(
    questionId,
    false,
    returnMarkup,
  );

  if (displayValue) {
    if (returnMarkup) {
      return <>{parseStringToComponents(displayValue)}</>;
    }
    return <>{displayValue}</>;
  } else {
    return <AnswerDisplayValuePlaceholder />;
  }
};

export const getResultCalculation = (calculationId?: string) => {
  const { currentResult } = useWalkthroughState();
  if (!calculationId || !currentResult || !currentResult.resultCalculations) {
    console.warn("Missing result calculation ID or current result data.");
    return <AnswerDisplayValuePlaceholder />;
  }

  const resultCalculation = currentResult.resultCalculations.find(
    ({ id }) => id === calculationId,
  );

  if (!resultCalculation) {
    console.warn("Missing result calculation - incorrect json data.");
    return <AnswerDisplayValuePlaceholder />;
  }

  try {
    const {
      answerStore: { getAnswerToCheckValue },
    } = useWalkthroughState();
    const displayNumber = calculateResultDisplayNumber(
      resultCalculation,
      getAnswerToCheckValue,
    );
    if (displayNumber) {
      return <>{mathRoundToTwoDecimalsIfNeeded(displayNumber)}</>;
    } else {
      return <AnswerDisplayValuePlaceholder />;
    }
  } catch (error) {
    console.warn("Error calculating result value", error);
    return <AnswerDisplayValuePlaceholder />;
  }
};

export const getStringFromComponents = (node: ReactNode): string => {
  if (node == null) return "";

  switch (typeof node) {
    case "string":
    case "number":
      return node.toString();

    case "boolean":
      return "";

    case "object": {
      if (Array.isArray(node))
        return node.map(getStringFromComponents).join("");

      if ("props" in node) return getStringFromComponents(node.props.children);
    } // eslint-ignore-line no-fallthrough

    default:
      // NOTE: I don't believe this is reachable, but it's here for completeness and to avoid a linter warning
      console.warn("Unresolved `node` of type:", typeof node, node);
      return "";
  }
};

export const stripReferencePrefix = (reference: string) => {
  // Removes the `v2-db-` prefix from `v2-db-9.9.9.1`
  const prefix = "v";
  if (reference.toLowerCase().startsWith(prefix)) {
    return reference.split("-").slice(2).join("");
  }
};
