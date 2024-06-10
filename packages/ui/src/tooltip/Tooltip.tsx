import {
  Tooltip as AriaTooltip,
  TooltipProps as ReactAriaTooltipProps
} from "react-aria-components";
import Image from "@repo/ui/image";

import "./Tooltip.css";

export interface TooltipProps extends ReactAriaTooltipProps {
  children: React.ReactNode;
}

export default function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip {...props} className="ui-tooltip-aria"> 
      <Image src="tooltip-triangle.svg" className={"ui-tooltip-triangle"} />
      <div className="ui-tooltip-content">
        {children}
      </div>
    </AriaTooltip>
  );
}


