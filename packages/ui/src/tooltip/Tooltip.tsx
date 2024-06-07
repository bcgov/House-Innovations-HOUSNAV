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
    <AriaTooltip {...props} className="aria-tooltip"> 
      <Image src="tooltip-triangle.svg" className={"tooltip-triangle"} />
      <div className="tooltip-content">
        {children}
      </div>
    </AriaTooltip>
  );
}
