// repo
import Button, { ButtonProps } from "@repo/ui/button";
import { TESTID_DEFINED_TERM } from "@repo/constants/src/testids";
import { GLOSSARY_SECTIONS, GLOSSARY_TERMS } from "../../../web/tests/mockData";
import Tooltip from "@repo/ui/tooltip";
import ModalSide from "@repo/ui/modal-side";

export interface DefinedTermProps extends Omit<ButtonProps, "variant"> {
  term: string;
}

export default function DefinedTerm({
  term,
  children,
  "data-testid": testid = TESTID_DEFINED_TERM,
  ...props
}: DefinedTermProps) {
  // TODO: Add glossary term functionality

  const button = (
    <Button
      variant="glossary"
      data-term={term}
      data-testid={`${testid}-${term}`}
      {...props}
    >
      {children}
    </Button>
  );

  const tooltipButton = (
    <Tooltip
      tooltipContent={GLOSSARY_TERMS.default.tooltipContent}
      triggerContent={button}
    ></Tooltip>
  );

  // TODO: Matt or Nicholas, add correct section for customHandler
  const randomSection = Math.floor(Math.random() * 10) + 1;
  return (
    <ModalSide
      triggerContent={tooltipButton}
      sections={GLOSSARY_SECTIONS}
      scrollToSection={`9.9.9.${randomSection}`}
    />
  );
}
