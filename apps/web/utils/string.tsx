// 3rd party
import { FunctionComponent, ReactNode } from "react";
import parse, {
  DOMNode,
  Element,
  domToReact,
  attributesToProps,
} from "html-react-parser";
// repo
import Button from "@repo/ui/button";
import Tooltip from "@repo/ui/tooltip";
import {
  ModalSideDataEnum,
  TooltipGlossaryData,
} from "@repo/data/useGlossaryData";
import ModalSide from "@repo/ui/modal-side";
import { ANSWER_DISPLAY_VALUE_PLACEHOLDER } from "@repo/constants/src/constants";
// local
import DefinedTerm, {
  DefinedTermProps,
} from "../components/defined-term/DefinedTerm";
import PDFDownloadLink, {
  PDFDownloadLinkProps,
} from "../components/pdf-download-link/PDFDownloadLink";
import { useWalkthroughState } from "../stores/WalkthroughRootStore";

// Define custom components for html-react-parser
const definedTermName = "defined-term";
const definedTermModal = "defined-term-glossary";
const glossaryTerm = "glossary-term";
const buildingCode = "building-code";
const buildingCodeModal = "building-code-modal";
const pdfDownloadLinkName = "pdf-download-link";
const answerValue = "answer-value";

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
              <span className="ui-ModalGlossaryContent-Term">
                {domToReact(domNode.children as DOMNode[]) as string}
              </span>
            );

          case buildingCode:
            return (
              <ModalSide
                type={ModalSideDataEnum.BUILDING_CODE}
                triggerContent={<Button variant="code">{term}</Button>}
                scrollTo={domNode.attribs["reference"] ?? ""}
              />
            );

          case answerValue: {
            return getAnswerValueDisplay(domNode.attribs["answer"]);
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

const getAnswerValueDisplay = (questionId?: string) => {
  if (!questionId) {
    console.warn("Missing question ID - incorrect json data.");
    return ANSWER_DISPLAY_VALUE_PLACEHOLDER;
  }

  const { getQuestionAnswerValueDisplay } = useWalkthroughState();
  const displayValue = getQuestionAnswerValueDisplay(questionId);

  return <>{displayValue || ANSWER_DISPLAY_VALUE_PLACEHOLDER}</>;
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
    return reference.split("-").slice(2);
  }
};
