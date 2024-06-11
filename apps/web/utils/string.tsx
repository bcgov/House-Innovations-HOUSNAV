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

// Define custom components for html-react-parser
const definedTermName = "defined-term";
type CustomComponentTypes = typeof definedTermName;
type CustomComponentProps = DefinedTermProps;
const customComponents: Record<
  CustomComponentTypes,
  FunctionComponent<CustomComponentProps>
> = {
  [definedTermName]: DefinedTerm,
};

export const parseStringToComponents = (html: string) => {
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

      if ("props" in node)return getStringFromComponents(node.props.children);
    } // eslint-ignore-line no-fallthrough

    default:
      // NOTE: I don't believe this is reachable, but it's here for completeness and to avoid a linter warning
      console.warn("Unresolved `node` of type:", typeof node, node);
      return "";
  }
};
