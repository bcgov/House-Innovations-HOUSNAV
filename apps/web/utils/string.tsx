// 3rd party
import { FunctionComponent, ReactNode } from "react";
import parse, {
  DOMNode,
  Element,
  domToReact,
  attributesToProps,
} from "html-react-parser";
// local
import DefinedTerm, {
  DefinedTermProps,
} from "../components/defined-term/DefinedTerm";
import Button from "@repo/ui/button";

// Define custom components for html-react-parser
const definedTermName = "defined-term";
const definedTermModal = "defined-term-modal";
type CustomComponentTypes = typeof definedTermName | typeof definedTermModal;
type CustomComponentProps = DefinedTermProps;
const customComponents: Record<
  CustomComponentTypes,
  FunctionComponent<CustomComponentProps>
> = {
  [definedTermName]: DefinedTerm,
  [definedTermModal]: Button,
};

export const parseStringToComponents = (html: string, customHandler?: any) => {
  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        switch (domNode.name) {
          case definedTermName: {
            const DefinedTermComponent = customComponents[definedTermName];
            const props = attributesToProps(domNode.attribs);

            if (DefinedTermComponent) {
              return (
                <DefinedTermComponent
                  {...(props as unknown as DefinedTermProps)}
                  key={domNode.attribs.key}
                >
                  {domToReact(domNode.children as DOMNode[], options)}
                </DefinedTermComponent>
              );
            }
          }
          case definedTermModal: {
            // TODO: Matt or Nicholas, add correct section for customHandler
            const randomSection = Math.floor(Math.random() * 10) + 1;
            return (
              <Button
                variant="glossary"
                onPress={
                  customHandler
                    ? () => customHandler(`9.9.9.${randomSection}`)
                    : () => {}
                }
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
