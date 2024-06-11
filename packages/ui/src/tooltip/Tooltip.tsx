import { ReactNode} from 'react'

import {
  Tooltip as AriaTooltip,
  TooltipProps as ReactAriaTooltipProps,
  TooltipTrigger
} from "react-aria-components";
import Image from "@repo/ui/image";

import "./Tooltip.css";

export interface TooltipProps extends ReactAriaTooltipProps {
  tooltipContent: ReactNode;
  triggerContent: ReactNode;
}

export default function Tooltip({ tooltipContent, triggerContent, ...props }: TooltipProps) {
  return (
    <TooltipTrigger delay={0} closeDelay={0}>
      {triggerContent}
      <AriaTooltip {...props} className="ui-Tooltip--Aria" placement="bottom" aria-live="polite"> 
        <Image src="tooltip-triangle.svg" className={"ui-Tooltip--Triangle"} />
        <div className="ui-Tooltip--Content">
          {tooltipContent}
        </div>
      </AriaTooltip>
    </TooltipTrigger>

  );
}


