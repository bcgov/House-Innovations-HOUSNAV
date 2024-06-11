// repo
import Button, { ButtonProps } from "@repo/ui/button";
import { TESTID_DEFINED_TERM } from "@repo/constants/src/testids";
import Tooltip from "@repo/ui/tooltip";

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
  const mockGlossary = {
    default: { tooltipContent: "Default Tooltip" },
  };

  return (
    <Tooltip
      tooltipContent={mockGlossary.default.tooltipContent}
      triggerContent={
        <Button
          variant="glossary"
          data-term={term}
          data-testid={`${testid}-${term}`}
          {...props}
        >
          {children}
        </Button>
      }
    ></Tooltip>
  );
}
