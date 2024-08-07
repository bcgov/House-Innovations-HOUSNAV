// repo
import Button, { ButtonProps } from "@repo/ui/button";
import { TESTID_DEFINED_TERM } from "@repo/constants/src/testids";
import Tooltip from "@repo/ui/tooltip";
import ModalSide from "@repo/ui/modal-side";
import {
  ModalSideDataEnum,
  TooltipGlossaryData,
} from "@repo/data/useGlossaryData";

export interface DefinedTermProps extends Omit<ButtonProps, "variant"> {
  term: string;
  overrideTooltip?: string;
}

export default function DefinedTerm({
  term,
  overrideTooltip,
  children,
  "data-testid": testid = TESTID_DEFINED_TERM,
  ...props
}: DefinedTermProps) {
  const tooltipTerm = overrideTooltip ?? term;
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
      tooltipLabel={`Select to open defined term modal`}
      tooltipContent={TooltipGlossaryData.get(tooltipTerm.toLocaleLowerCase())}
      triggerContent={button}
    ></Tooltip>
  );

  return (
    <ModalSide
      type={ModalSideDataEnum.GLOSSARY}
      triggerContent={tooltipButton}
      scrollTo={term}
    />
  );
}
