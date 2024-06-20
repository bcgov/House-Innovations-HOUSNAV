// 3rd party
import { FunctionComponent, ReactNode } from "react";
import parse, {
  DOMNode,
  Element,
  domToReact,
  attributesToProps,
} from "html-react-parser";
// repo
import Button, { ButtonProps } from "@repo/ui/button";
import Tooltip from "@repo/ui/tooltip";
// local
import DefinedTerm, {
  DefinedTermProps,
} from "../components/defined-term/DefinedTerm";
import PDFDownloadLink, {
  PDFDownloadLinkProps,
} from "../components/pdf-download-link/PDFDownloadLink";
import { GLOSSARY_TERMS } from "../tests/mockData";
import { TooltipGlossaryData } from "@repo/data/useGlossaryData";

// Define custom components for html-react-parser
const definedTermName = "defined-term";
const definedTermModal = "defined-term-glossary";
const glossaryTerm = "glossary-term";
const buildingCode = "building-code";
const pdfDownloadLinkName = "pdf-download-link";
type CustomComponentTypes =
  | typeof definedTermName
  | typeof definedTermModal
  | typeof pdfDownloadLinkName;

type CustomComponentProps<T extends CustomComponentTypes> =
  T extends typeof definedTermName
    ? DefinedTermProps
    : T extends typeof definedTermModal
      ? ButtonProps
      : T extends typeof pdfDownloadLinkName
        ? PDFDownloadLinkProps
        : never;

type CustomComponentRecord<T extends CustomComponentTypes> = {
  [K in T]: FunctionComponent<CustomComponentProps<K>>;
};

const customComponents: CustomComponentRecord<CustomComponentTypes> = {
  [definedTermName]: DefinedTerm,
  [definedTermModal]: Button,
  [pdfDownloadLinkName]: PDFDownloadLink,
};
type CustomHandler = (section: string) => void;

export const parseStringToComponents = (
  html: string,
  customHandler?: CustomHandler,
) => {
  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        const overrideTerm = domNode.attribs["override-term"];
        const term =
          domNode.attribs["override-term"] ??
          (domToReact(domNode.children as DOMNode[]) as string);
        switch (domNode.name) {
          case definedTermName: {
            const DefinedTermComponent = customComponents[definedTermName];
            const props = attributesToProps(domNode.attribs);

                return (
                  <DefinedTermComponent
                    {...(props as unknown as DefinedTermProps)}
                    key={domNode.attribs.key}
                    overrideTerm={overrideTerm}
                    term={domToReact(domNode.children as DOMNode[]) as string}
                  >
                    {domToReact(domNode.children as DOMNode[], options)}
                  </DefinedTermComponent>
                );
              }
          case pdfDownloadLinkName: {
            const PDFDownloadLinkComponent =
              customComponents[pdfDownloadLinkName];
            const props = attributesToProps(domNode.attribs);

            return (
              <PDFDownloadLinkComponent
                {...(props as unknown as PDFDownloadLinkProps)}
                key={domNode.attribs.key}
              >
                {domToReact(domNode.children as DOMNode[], options)}
              </PDFDownloadLinkComponent>
            );
          }
          case definedTermModal: {
            return (
              <Tooltip
                tooltipContent={TooltipGlossaryData.get(term)}
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
          }
          case glossaryTerm: {
            return <span className="ui-ModalSide-Term">{term}</span>;
          }

          case buildingCode: {
            return (
              <Button
                variant="code"
                onPress={customHandler ? () => customHandler(term) : () => {}}
              >
                {domToReact(domNode.children as DOMNode[])}
              </Button>
            );
          }
        }
      }
    },
  };
  return parse(html, options);
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
