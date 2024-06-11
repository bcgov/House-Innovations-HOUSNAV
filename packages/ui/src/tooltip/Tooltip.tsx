import {
  Tooltip as AriaTooltip,
  TooltipProps as ReactAriaTooltipProps,
  TooltipTrigger
} from "react-aria-components";
import Image from "@repo/ui/image";

import "./Tooltip.css";

export interface TooltipProps extends ReactAriaTooltipProps {
  tooltipContent: React.ReactNode;
  triggerContent: React.ReactNode;
}

export default function Tooltip({ tooltipContent, triggerContent, ...props }: TooltipProps) {
  return (
    <TooltipTrigger delay={0} closeDelay={0}>
      {triggerContent}
      <AriaTooltip {...props} className="ui-tooltip-aria" placement="bottom" aria-live="polite"> 
        <Image src="tooltip-triangle.svg" className={"ui-tooltip-triangle"} />
        <div className="ui-tooltip-content">
          {tooltipContent}
        </div>
      </AriaTooltip>
    </TooltipTrigger>

  );
}


